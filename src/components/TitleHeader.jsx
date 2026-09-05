import ScrollFloat from "./reactbits/ScrollFloat";

const TitleHeader = ({ title, sub }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="hero-badge">
        <p>{sub}</p>
      </div>
      <div className="w-full">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="top bottom"
          scrollEnd="bottom center"
          stagger={0.02}
          containerClassName="font-semibold md:text-5xl text-3xl text-center w-full"
        >
          {title}
        </ScrollFloat>
      </div>
    </div>
  );
};

export default TitleHeader;
