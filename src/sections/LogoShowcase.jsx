import { logoIconsList } from "../constants";
import ScrollVelocity from "../components/reactbits/ScrollVelocity";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center pointer-events-none drop-shadow-lg">
      <img
        src={icon.imgPath}
        alt={icon.name}
        className="w-16 h-16 md:w-28 md:h-28 object-contain transition-transform duration-300"
      />
    </div>
  );
};

const LogoShowcase = () => (
  <div className="md:my-20 my-10 relative overflow-hidden">
    <div className="text-center mb-8 relative z-10">
      <p className="text-blue-50 text-sm md:text-base font-bold uppercase tracking-[0.2em]">Technologies I work with</p>
    </div>
    
    <div className="gradient-edge z-10" />
    <div className="gradient-edge z-10 right-0" />

    <div className="w-full">
      <ScrollVelocity velocity={3} className="w-full h-auto py-8">
        {logoIconsList.map((icon, index) => (
          <LogoIcon key={index} icon={icon} />
        ))}
      </ScrollVelocity>
    </div>
  </div>
);

export default LogoShowcase;

