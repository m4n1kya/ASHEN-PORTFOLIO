import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_lightning;
  uniform float u_reveal;

  // 2D Random
  float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise
  float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  #define OCTAVES 8
  float fbm (in vec2 st) {
      float value = 0.0;
      float amplitude = 0.55;
      for (int i = 0; i < OCTAVES; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
      }
      return value;
  }

  void main() {
      // Normalize coordinates for noise (aspect ratio corrected)
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;
      
      // Base coordinates
      vec2 flowPos = st;

      // Fractal Brownian Motion (FBM) Domain Warping with 3D PARALLAX
      // Layer 1 (Deep background clouds - moving slowly)
      vec2 q = vec2(0.);
      q.x = fbm( flowPos + vec2(-u_time * 0.05, 0.0) );
      q.y = fbm( flowPos + vec2(1.0) );

      // Layer 2 (Midground clouds - moving faster, creating turbulent overlaps)
      vec2 r_vec = vec2(0.);
      r_vec.x = fbm( flowPos + 1.5*q + vec2(1.7,9.2) + vec2(-u_time * 0.15, u_time * 0.02) );
      r_vec.y = fbm( flowPos + 1.5*q + vec2(8.3,2.8) + vec2(-u_time * 0.12, 0.0) );

      // Layer 3 (Foreground clouds - moving the fastest, tearing across the screen)
      float f = fbm(flowPos + r_vec + vec2(-u_time * 0.3, 0.0));

      // Deep Dark Thunder Cloud Colors (Slightly brightened per request)
      vec3 color = mix(vec3(0.04, 0.04, 0.05), vec3(0.2, 0.22, 0.25), clamp(f * 2.5 - 1.0, 0.0, 1.0));

      // Subsurface Lightning Scattering (Brighter flashes for better contrast)
      color += vec3(0.18, 0.2, 0.24) * u_lightning * (f + 0.1);
      color = pow(color, vec3(1.2)); // Reduced gamma crush slightly to reveal more detail

      // REVEAL LOGIC (Highly Uneven Left to Right Sweep)
      float screenX = gl_FragCoord.xy.x / u_resolution.x;
      
      // Create massive, low-frequency 'chunks' (macro noise) combined with detailed smoke (f)
      float macroNoise = noise(st * 3.0 + vec2(u_time * 0.2, u_time * 0.5));
      float noiseEdge = (macroNoise * 1.5) + (f * 0.8); // Huge chunks tearing away
      
      // Calculate alpha. u_reveal now needs to travel further to clear the massive noise chunks.
      float alpha = smoothstep(u_reveal - 0.5, u_reveal + 0.2, screenX + noiseEdge);

      // Output color with dynamic alpha
      gl_FragColor = vec4(color, alpha);
  }
`;

const Loader = ({ hasLoadedOnce }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // If hasLoadedOnce is true, we don't want to run the WebGL loader logic
    if (hasLoadedOnce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize raw WebGL with alpha enabled so we can make the canvas transparent during the sweep!
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Compile Shaders
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Link Program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full-screen Quad Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uLightning = gl.getUniformLocation(program, "u_lightning");
    const uReveal = gl.getUniformLocation(program, "u_reveal");

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Uniform Values
    const uniforms = {
      lightning: 0,
      reveal: -0.5 // Start fully opaque (offscreen left)
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let animationFrameId;
    const startTime = Date.now();

    const render = () => {
      const time = (Date.now() - startTime) * 0.001;

      // Random lightning generator
      if (Math.random() < 0.03 && uniforms.reveal < 0.5) {
        uniforms.lightning = Math.random() * 0.8 + 0.2;
      } else {
        uniforms.lightning *= 0.85; // Decay
      }

      // Clear the canvas to be fully transparent every frame
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTime, time);
      gl.uniform1f(uLightning, uniforms.lightning);
      gl.uniform1f(uReveal, uniforms.reveal);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // GSAP Cinematic Sequence
    const tl = gsap.timeline({
      delay: 1.4, // Slightly reduced delay to speed things up
      onComplete: () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resize);
        
        // Hide the container to stop rendering and remove it from view
        if (containerRef.current) containerRef.current.style.display = 'none';
      }
    });

    // Add a cinematic camera dolly push (slowly zooming into the clouds while the storm rages)
    gsap.to(canvasRef.current, {
      scale: 1.2,
      duration: 5.0,
      ease: "power2.out" // Smoother deceleration
    });

    // CRITICAL FIX: Instantly fade out the HTML pre-loader blocker so you can actually see the storm raging!
    // We give it a tiny 0.1s delay to guarantee WebGL has drawn its first frame, preventing any flashing.
    gsap.to("#pre-loader-blocker", { opacity: 0, duration: 0.2, delay: 0.1 });

    // Strip the React container's background color right before the canvas starts turning transparent.
    tl.to(containerRef.current, { backgroundColor: "transparent", duration: 0.01 })
      .to(uniforms, {
        reveal: 3.5, // Pushes past the right edge + the massive noise distortion
        duration: 2.5, // Slightly shorter sweep
        ease: "power2.inOut",
      }, "<");

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  if (hasLoadedOnce) {
    const blocker = document.getElementById('pre-loader-blocker');
    if (blocker) blocker.remove();
    return null;
  }

  return (
    // Added 'bg-black' to prevent the 1-frame flash while WebGL compiles the shaders
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-black pointer-events-none"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
    </div>
  );
};

export default Loader;
