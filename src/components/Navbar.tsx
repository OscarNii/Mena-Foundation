import { useState } from 'react';
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-card border-b bg-white/30 backdrop-blur-md">
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
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-blue-700 hover:text-blue-900 font-semibold transition-colors"
              >
                {item.label}
              </a>
            ))}
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
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="block text-blue-700 hover:text-blue-900 font-semibold py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
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
