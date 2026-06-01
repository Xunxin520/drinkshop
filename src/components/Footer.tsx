import { siteConfig } from '@/config/site.config';

export default function Footer() {
  const footer = siteConfig.footer;
  return (
    <footer className="bg-zinc-50 border-t border-zinc-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footer.columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="font-semibold text-zinc-900 text-sm">{col.title}</h4>
              {col.links.map((link) => (
                <a key={link} href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          ))}
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-900 text-sm">{footer.newsletter.title}</h4>
            <p className="text-sm text-zinc-500">{footer.newsletter.subtitle}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={footer.newsletter.placeholder}
                className="flex-1 px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-300"
              />
              <button className="px-4 py-2 bg-zinc-900 text-white text-sm rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer">
                {footer.newsletter.button}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-zinc-200 text-center text-sm text-zinc-400">
          &copy; {new Date().getFullYear()} {siteConfig.brandName}.{footer.copyright}
        </div>
      </div>
    </footer>
  );
}
