export default function WhyChooseCard({ title, description, icon }) {
  return (
    <div
      className="group flex items-start gap-6 p-8 rounded-md border border-gray-100 bg-white shadow-sm hover:shadow-xl hover-gold-glow transition-all duration-300 h-full"
    >
      <div className="w-14 h-14 shrink-0 rounded-md bg-accent/10 flex items-center justify-center text-accent text-2xl group-hover:bg-accent group-hover:text-white transition-all duration-300 animate-float-slow">
        <span>{icon}</span>
      </div>
      <div>
        <h3 className="font-heading font-bold text-lg text-charcoal mb-2.5 group-hover:text-wood transition-colors duration-300">
          {title}
        </h3>
        <p className="text-charcoal-light/75 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

