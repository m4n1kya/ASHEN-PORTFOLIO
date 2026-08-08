import { abilities } from "../constants";

const FeatureCards = () => (
  <div id="about" className="w-full section-padding">
    <div className="w-full text-center mb-12">
      <h2 className="text-white text-3xl md:text-5xl font-bold">Engineering Roles</h2>
      <p className="text-blue-50 mt-4 md:text-xl">Building across the stack, from intelligent products to production-ready applications.</p>
    </div>
    <div className="mx-auto grid-4-cols">
      {abilities.map(({ imgPath, title, desc }) => (
        <div
          key={title}
          className="card-border rounded-xl p-8 flex flex-col gap-4"
        >
          <div className="size-14 flex items-center justify-center rounded-full bg-black-200">
            <img src={imgPath} alt={title} className="w-8 h-8 object-contain" />
          </div>
          <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
          <p className="text-white-50 text-base">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;