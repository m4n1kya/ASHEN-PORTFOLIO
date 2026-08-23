import { logoIconsList } from "../constants";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img
        src={icon.imgPath}
        alt={icon.name}
        className="w-14 h-14 md:w-20 md:h-20 object-contain"
      />
    </div>
  );
};

const LogoShowcase = () => (
  <div className="md:my-20 my-10 relative">
    <div className="text-center mb-8 relative z-10">
      <p className="text-blue-50 text-sm md:text-base font-bold uppercase tracking-[0.2em]">Technologies I work with</p>
    </div>
    
    <div className="gradient-edge" />
    <div className="gradient-edge" />

    <div className="marquee h-32 md:h-52">
      <div className="marquee-box md:gap-12 gap-5">
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}

        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export default LogoShowcase;
