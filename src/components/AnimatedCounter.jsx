import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "../constants";
import SpotlightCard from "./reactbits/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    if (!counterItems || counterItems.length === 0) return;

    countersRef.current.forEach((counter, index) => {
      if (!counter) return;
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];
      if (!numberElement || !item) return;

      // Set initial value to 0
      gsap.set(numberElement, { innerText: "0" });

      // Create the counting animation
      gsap.to(numberElement, {
        innerText: item.value,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: "#counter",
          start: "top 85%",
        },
        onComplete: () => {
          numberElement.textContent = `${item.value}${item.suffix}`;
        },
      });
    });
  }, []);

  if (!counterItems || counterItems.length === 0) return null;

  return (
    <div
      id="counter"
      ref={counterRef}
      className="padding-x-lg xl:mt-10 mt-20 pb-16 relative z-20"
    >
      <div className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            className="w-full"
          >
            <SpotlightCard
              className="p-6 md:p-8 flex flex-col justify-center items-center text-center border border-white/10 rounded-2xl"
              spotlightColor="rgba(217, 236, 255, 0.08)"
              borderColor="rgba(217, 236, 255, 0.25)"
            >
              <div className="counter-number text-white text-3xl md:text-5xl font-bold mb-2 tracking-tight">
                0 {item.suffix}
              </div>
              <div className="text-white-50 text-sm md:text-base font-medium">
                {item.label}
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;



