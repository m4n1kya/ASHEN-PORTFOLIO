import { logoIconsList } from "../constants";
import ShinyText from "../components/reactbits/ShinyText";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex items-center justify-center mx-4 md:mx-7">
      <div className="size-20 md:size-24 flex items-center justify-center p-3.5 md:p-4 rounded-2xl bg-black-100/90 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] group cursor-pointer">
        <img
          src={icon.imgPath}
          alt={icon.name}
          title={icon.name}
          className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
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

    <div className="marquee h-36 md:h-52 flex items-center">
      <div className="marquee-box flex items-center">
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
