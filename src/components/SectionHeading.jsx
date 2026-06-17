export default function SectionHeading({ title, subtitle, light = false, center = true }) {
  return (
    <div
      className={`mb-20 ${center ? 'text-center' : ''}`}
    >
      <div className={`flex items-center gap-4 mb-4 ${center ? 'justify-center' : ''}`}>
        <span className="w-10 h-[2px] bg-accent"></span>
        <span className="text-accent font-extrabold text-xs uppercase tracking-[0.25em]">{subtitle}</span>
        <span className="w-10 h-[2px] bg-accent"></span>
      </div>
      <h2 className={`font-heading font-black text-3xl md:text-4xl lg:text-5xl leading-tight ${light ? 'text-white' : 'text-charcoal'}`}>
        {title}
      </h2>
    </div>
  );
}

