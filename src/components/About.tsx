import { useState } from 'react';
import { Target, Eye, Smile, Heart, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface AboutSection {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const sections: AboutSection[] = [
  {
    id: 1,
    icon: <Target className="w-8 h-8 text-blue-600" />,
    title: 'Our Mission',
    description: 'To empower underprivileged communities through education, healthcare, and sustainable development initiatives.',
    color: 'bg-blue-100'
  },
  {
    id: 2,
    icon: <Eye className="w-8 h-8 text-blue-600" />,
    title: 'Our Vision',
    description: 'A world where every individual has access to basic necessities and opportunities to thrive and succeed.',
    color: 'bg-blue-100'
  },
  {
    id: 3,
    icon: <Smile className="w-8 h-8 text-blue-600" />,
    title: 'Our Impact',
    description: 'Creating lasting change through transparency, accountability, and community-focused programs that make a real difference.',
    color: 'bg-blue-100'
  },
  {
    id: 4,
    icon: <Heart className="w-8 h-8 text-blue-600" />,
    title: 'Our Values',
    description: 'Integrity, compassion, transparency, and unwavering commitment to sustainable change in every community we serve.',
    color: 'bg-blue-100'
  },
  {
    id: 5,
    icon: <Zap className="w-8 h-8 text-blue-600" />,
    title: 'Our Approach',
    description: 'Community-driven solutions with measurable outcomes, fostering partnerships that create lasting impact and empower local leaders.',
    color: 'bg-blue-100'
  }
];

// Duplicate sections for seamless infinite scroll
const duplicatedSections = [...sections, ...sections, ...sections];

export function About() {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const scrollBy = (amount: number) => {
    const container = document.getElementById('marquee-container');
    if (container) {
      container.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            About Our Mission
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Dedicated to creating positive change in communities worldwide through sustainable programs and compassionate action.
          </p>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => scrollBy(-400)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md hidden md:flex items-center justify-center"
          aria-label="Previous section"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => scrollBy(400)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-blue-600 p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md hidden md:flex items-center justify-center"
          aria-label="Next section"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Continuous Marquee Container */}
        <div
          id="marquee-container"
          className="marquee-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`marquee-content ${isPaused ? 'marquee-paused' : ''}`}>
            {duplicatedSections.map((section, index) => (
              <div
                key={`${section.id}-${index}`}
                className="flex-shrink-0 w-80 md:w-96 about-card"
              >
                <div className="glass-card p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 h-full">
                  <div className={`${section.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">{section.title}</h3>
                  <p className="text-blue-700 text-center leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
