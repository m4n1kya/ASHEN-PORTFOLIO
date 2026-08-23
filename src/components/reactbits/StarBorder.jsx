/**
 * StarBorder
 * Shimmering dynamic light gradient border traveling smoothly around cards/buttons.
 */
export default function StarBorder({
  as: Component = 'div',
  className = '',
  color = '#d9ecff',
  speed = '6s',
  children,
  ...props
}) {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-xl p-[1px] ${className}`}
      {...props}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-10 w-full h-full rounded-xl bg-black-100">
        {children}
      </div>
    </Component>
  );
}
