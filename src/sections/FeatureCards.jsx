import { abilities } from "../constants";
import SpotlightCard from "../components/reactbits/SpotlightCard";
import ShinyText from "../components/reactbits/ShinyText";
import ScrollFloat from "../components/reactbits/ScrollFloat";

const FeatureCards = () => (
  <div id="about" className="w-full section-padding">
    <div className="w-full text-center mb-12">
      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='top bottom'
        scrollEnd='bottom center'
        stagger={0.02}
        containerClassName="text-white text-3xl md:text-5xl font-bold w-full"
      >
        Engineering Roles
      </ScrollFloat>
      <p className="text-blue-50 mt-4 md:text-xl max-w-3xl mx-auto">
        Building across the stack, from <ShinyText text="intelligent products" className="text-white font-semibold" speed={4} /> to production-ready systems.
      </p>
    </div>
    <div className="mx-auto grid-4-cols">
      {abilities.map(({ imgPath, title, desc }) => (
        <SpotlightCard
          key={title}
          className="flex flex-col gap-4 relative transition-all duration-300 hover:border-white/30"
          spotlightColor="rgba(217, 236, 255, 0.08)"
          borderColor="rgba(217, 236, 255, 0.3)"
        >
          <div className="size-14 flex items-center justify-center rounded-full bg-black-200 border border-white/10 shadow-inner">
            <img src={imgPath} alt={title} className="w-8 h-8 object-contain" />
          </div>
          <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
          <p className="text-white-50 text-base leading-relaxed">{desc}</p>
        </SpotlightCard>
      ))}
    </div>
  </div>
);

export default FeatureCards;