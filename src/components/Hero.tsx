import { siteConfig } from '@/config/site.config';

export default function Hero() {
  const hero = siteConfig.hero;
  return (
    <section id="hero" className={`relative bg-gradient-to-br ${siteConfig.heroBg} overflow-hidden`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 py-16 md:py-24">
        <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-medium px-3 py-1 rounded-full">
            {hero.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-tight">
            {hero.title}
          </h1>
          <p className="text-lg text-zinc-600 max-w-md mx-auto md:mx-0">
            {hero.subtitle}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-3xl font-bold text-rose-500">¥{hero.price}</span>
            {hero.originalPrice && (
              <span className="text-lg text-zinc-400 line-through">¥{hero.originalPrice}</span>
            )}
          </div>
          <a
            href="#products"
            className="inline-block bg-zinc-900 text-white font-medium px-8 py-3 rounded-full hover:bg-zinc-800 transition-all cursor-pointer"
          >
            {hero.buttonText}
          </a>
        </div>
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <span className="text-[120px] md:text-[180px] select-none">{hero.emoji}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
