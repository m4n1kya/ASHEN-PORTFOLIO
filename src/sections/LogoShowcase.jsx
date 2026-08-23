import { logoIconsList } from "../constants";
import Magnet from "../components/reactbits/Magnet";
import ShinyText from "../components/reactbits/ShinyText";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <Magnet padding={20} magnetStrength={3}>
        <div className="size-16 md:size-20 flex items-center justify-center p-3 rounded-2xl bg-black-100/50 border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <img src={icon.imgPath} alt={icon.name} className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100" />
        </div>
      </Magnet>
    </div>
  );
};

const LogoShowcase = () => (
  <div className="md:my-20 my-10 relative">
    <div className="text-center mb-8 relative z-10">
      <p className="text-blue-50 text-sm md:text-base font-bold uppercase tracking-[0.2em]">
        <ShinyText text="Technologies I work with" className="font-bold" speed={4} />
      </p>
    </div>
    
    <div className="gradient-edge" />
    <div className="gradient-edge" />

    <div className="marquee h-32 md:h-52 flex items-center">
      <div className="marquee-box md:gap-12 gap-6 flex items-center">
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}

        {logoIconsList.map((icon, index) => (
          <LogoIcon key={`repeat-${index}`} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export default LogoShowcase;
