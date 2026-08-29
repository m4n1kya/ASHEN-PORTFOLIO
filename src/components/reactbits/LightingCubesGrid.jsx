import React, { useEffect, useRef } from 'react';
import createREGL from 'regl';
import { mat4 } from 'gl-matrix';

const LightingCubesGrid = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    containerRef.current.appendChild(canvas);

    const regl = createREGL({
      canvas: canvas,
      extensions: ["ANGLE_instanced_arrays"]
    });

    // Геометрия куба с правильными вершинами для каждой грани
    const cubeVertices = [
      // Передняя грань
      [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5],
      [-0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5],
      
      // Задняя грань
      [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5],
      [0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5],
      
      // Нижняя грань
      [-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5],
      [-0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [0.5, -0.5, -0.5],
      
      // Верхняя грань
      [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5],
      [-0.5, 0.5, 0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5],
      
      // Левая грань
      [-0.5, -0.5, 0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5],
      [-0.5, -0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5],
      
      // Правая грань
      [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5],
      [0.5, -0.5, -0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5]
    ];

    // Правильные нормали для каждой грани
    const cubeNormals = [
      [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1],
      [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1],
      [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0],
      [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
      [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0],
      [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0]
    ];

    // Исправляем UV координаты
    const cubeUvs = [
      [0, 0], [1, 0], [1, 1], [0, 0], [1, 1], [0, 1],
      [0, 0], [1, 0], [1, 1], [0, 0], [1, 1], [0, 1],
      [0, 0], [1, 0], [1, 1], [0, 0], [1, 1], [0, 1],
      [0, 0], [1, 0], [1, 1], [0, 0], [1, 1], [0, 1],
      [0, 0], [1, 0], [1, 1], [0, 0], [1, 1], [0, 1],
      [0, 0], [1, 0], [1, 1], [0, 0], [1, 1], [0, 1]
    ];

    const cube = {
      position: regl.buffer(cubeVertices),
      normals: regl.buffer(cubeNormals),
      uvs: regl.buffer(cubeUvs),
      count: cubeVertices.length
    };

    const SIZE = 6;
    const count = Math.pow(SIZE, 3);

    const getPos = (i) => {
      const size = SIZE;
      const x = i % size;
      const y = Math.floor(i / size) % size;
      const z = Math.floor(i / (size * size));
      return [x - 2.5, y - 2.5, z - 2.5];
    }

    const getRandomPos = (i) => {
      const size = 5;
      const pos = getPos(i);
      const x = pos[0] * Math.random() * size;
      const y = pos[1] * Math.random() * size;
      const z = pos[2] * Math.random() * size;
      return [x, y, z];
    }

    const getColor = (pos) => {
      const [x, y, z] = pos;
      return [
          (z / 2) % 2,
          1,
          (y / 2) % 2,
        ]
    }

    const instances = Array(count).fill().map((_, i) => {
      const cubicPos = getPos(i);
      const randomPos = getRandomPos(i);
      return {
        position: cubicPos,
        randomPos: randomPos,
        rotation: [0, 0, 0],
        color: getColor(cubicPos),
        scale: 0.5
      }
    });

    const instanceBuffers = {
      position: regl.buffer(instances.map(i => i.position)),
      position2: regl.buffer(instances.map(i => i.randomPos)),
      rotation: regl.buffer(instances.map(i => i.rotation)),
      color: regl.buffer(instances.map(i => i.color)),
      scale: regl.buffer(instances.map(i => [i.scale]))
    };

    const drawCubes = regl({
      vert: `
      precision mediump float;
      attribute vec3 position;
      attribute vec3 normal;
      attribute vec2 uv;
      attribute vec3 instancePosition;
      attribute vec3 instancePosition2;
      attribute vec3 instanceRotation;
      attribute vec3 instanceColor;
      attribute float instanceScale;

      uniform mat4 projection, view;
      uniform float time;

      varying vec3 vNormal, vPosition, vColor;
      varying vec2 vUv;

      mat4 rotationX(float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return mat4(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
      }
      mat4 rotationY(float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return mat4(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
      }
      mat4 rotationZ(float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return mat4(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      }

      void main() {
        vColor = instanceColor;
        vUv = uv;

        mat4 model = mat4(1.0);
        float anim = pow(sin(time) * .5 + .5, 16.);
        model[3].xyz = mix(instancePosition, instancePosition2, anim);
        model = model * rotationX(instanceRotation.x);
        model = model * rotationY(instanceRotation.y);
        model = model * rotationZ(instanceRotation.z);
        model[0] *= instanceScale;
        model[1] *= instanceScale;
        model[2] *= instanceScale;

        mat3 normalMatrix = mat3(
          model[0].xyz / (instanceScale * instanceScale),
          model[1].xyz / (instanceScale * instanceScale),
          model[2].xyz / (instanceScale * instanceScale)
        );
        vNormal = normalMatrix * normal;
        vPosition = (model * vec4(position, 1.0)).xyz;
        gl_Position = projection * view * model * vec4(position, 1);
      }
      `,
      frag: `
      precision mediump float;
      varying vec3 vNormal, vPosition, vColor;
      varying vec2 vUv;

      uniform vec3 lightPosition;
      uniform vec3 lightColor;
      uniform float lightIntensity;
      uniform vec3 ambientColor;
      uniform float specularPower;
      uniform mat4 view;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(lightPosition - vPosition);
        vec3 viewPosition = view[0].xyz;

        float diff = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = lightColor * diff * lightIntensity;
        vec2 cuv = abs(vUv - vec2(0.5));
        float centerDist = length(cuv) * 2.;
        
        vec3 viewDir = normalize(viewPosition - vPosition);
        vec3 reflectDir = reflect(-lightDir, normal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), specularPower);
        vec3 specular = vec3(1., 0.25, 0.1) * spec * lightIntensity;

        vec3 lighting = ambientColor + diffuse + specular;
        vec3 result = (vColor) * (lighting * (1. - centerDist + 0.5));
        
        float alpha = smoothstep(0.3, 0.3, max(cuv.x, cuv.y));
        result = (vColor) * (lighting * (1. - centerDist + 0.5)) * alpha;

        gl_FragColor = vec4(result, alpha);
      }
      `,
      attributes: {
        position: cube.position,
        normal: cube.normals,
        uv: cube.uvs,
        instancePosition: { buffer: instanceBuffers.position, divisor: 1 },
        instancePosition2: { buffer: instanceBuffers.position2, divisor: 1 },
        instanceRotation: { buffer: instanceBuffers.rotation, divisor: 1 },
        instanceColor: { buffer: instanceBuffers.color, divisor: 1 },
        instanceScale: { buffer: instanceBuffers.scale, divisor: 1 }
      },
      count: cube.count,
      instances: instances.length,
      uniforms: {
        lightPosition: [0, 0, 0],
        lightColor: [1, 0, 0.5],
        lightIntensity: 2.0,
        ambientColor: [0.1, 0., 0.1],
        specularPower: 3.0,
        time: () => performance.now() * 0.0001,
        view: ({tick}) => {
          const t = performance.now() * 0.0001
          const a = Math.pow(Math.sin(t) + 0.5 * 0.5, 16) * 0.1 + (t);
          return mat4.lookAt(
            mat4.create(),
            [10 * Math.cos(a), 10 * Math.cos(a), 10 * Math.sin(a)],
            [0, 0, 0],
            [0, 1, 0]
          )
        },
        projection: ({viewportWidth, viewportHeight}) => 
          mat4.perspective(
            mat4.create(),
            Math.PI/4,
            viewportWidth / viewportHeight,
            0.01,
            1000
          )
      },
      blend: {
        enable: true,
        func: {
          srcRGB: "src alpha",
          srcAlpha: "src alpha",
          dstRGB: "one minus src alpha",
          dstAlpha: "one minus src alpha"
        }
      },
    });

    const frameLoop = regl.frame(({tick}) => {
      const t = performance.now() * 0.001;
      
      instances.forEach((inst, i) => {
        inst.rotation[1] = t;
      });
      
      instanceBuffers.rotation.subdata(instances.map(i => i.rotation));
      
      regl.clear({
        depth: 1,
        color: [0, 0, 0, 0] // Transparent background
      });
      drawCubes();
    });

    return () => {
      frameLoop.cancel();
      regl.destroy();
      if (containerRef.current && containerRef.current.contains(canvas)) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="lighting-cubes-grid"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden'
      }} 
    />
  );
};

export default LightingCubesGrid;
