import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Video', href: '#video' },
    { label: 'Donate', href: '#donate' },
    { label: 'Contact', href: '#contact' }
  ];

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ids = navItems.map(item => item.href.replace('#', ''));
    const sections = ids
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.15 }
    );

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-card-blue border-b backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img
              src={new URL('../imgs/Mena Logo.png', import.meta.url).href}
              alt="Mena Logo"
              className="w-8 h-8 md:w-10 md:h-10"
              style={{ animation: 'logoFloat 4000ms ease-in-out infinite' }}
            />
            <span className="text-xl font-bold text-blue-900">Mena Impact Foudation</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => {
              const id = item.href.replace('#', '');
              const isActive = activeId === id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={
                    `font-semibold transition-colors ${isActive ? 'glass-card-blue text-blue-900 px-3 py-1 rounded-md' : 'text-blue-700 hover:text-blue-900'}`
                  }
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#donate"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Donate Now
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-blue-700 hover:text-blue-900"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map(item => {
              const id = item.href.replace('#', '');
              const isActive = activeId === id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block font-semibold py-2 transition-colors ${isActive ? 'glass-card-blue text-blue-900' : 'text-blue-700 hover:text-blue-900'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#donate"
              className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 text-center"
              onClick={() => setIsOpen(false)}
            >
              Donate Now
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
