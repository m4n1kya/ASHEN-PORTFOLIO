/**
 * ShinyText
 * Creates a smooth animated shimmer light sweep across text elements.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-clip-text ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      {text}
    </span>
  );
}
