import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides: CarouselImage[] = [
    {
      id: 1,
      title: 'Transforming Lives Through Education',
      subtitle: 'Providing education and hope to underprivileged communities',
      image: 'src/imgs/PHOTO-2025-09-25-02-08-18.jpg'

    },
    {
      id: 2,
      title: 'Healthcare for All',
      subtitle: 'Making healthcare accessible to those in need',
      image: 'src/imgs/PHOTO-2025-09-25-02-11-17.jpg'
    },
    {
      id: 3,
      title: 'Community Support',
      subtitle: 'Building stronger communities through collective action',
      image: 'src/imgs/PHOTO-2025-09-25-02-13-44.jpg'
    },
    {
      id: 4,
      title: 'Clean Water Initiative',
      subtitle: 'Ensuring access to clean water for all',
      image: 'src/imgs/PHOTO-2025-09-25-02-13-44.jpg'
    },
    {
      id: 5,
      title: 'Empowering Futures',
      subtitle: 'Creating opportunities for sustainable growth',
      image: 'src/imgs/PHOTO-2025-09-25-02-11-17.jpg'
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  return (
    <section id="home" className="relative w-full h-screen mt-16 overflow-hidden bg-blue-900">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1200';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent"></div>
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-center px-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-slide-up-delayed max-w-3xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
            <a
              href="#donate"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce-slow"
            >
              Join Our Mission
            </a>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'bg-white w-10 h-3'
                  : 'bg-white/50 hover:bg-white/75 w-3 h-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
