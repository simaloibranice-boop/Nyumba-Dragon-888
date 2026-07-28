export default function GradientText({children}) {
  return (
    <span
      className="
      bg-gradient-to-r 
      from-yellow-400 
      via-orange-500 
      to-yellow-600
      bg-clip-text
      text-transparent
      "
    >
      {children}
    </span>
  );
}
