import { Heart, Users, Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-float top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float-delayed top-40 right-20"></div>
        <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float-slow bottom-20 left-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card p-12 rounded-3xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-6 animate-slide-up">
            Mena Charity Foundation
          </h1>
          <p className="text-xl md:text-2xl text-blue-700 mb-8 animate-slide-up-delayed">
            Transforming Lives Through Compassion and Action
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="glass-stat p-6 rounded-2xl animate-scale-in">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-blue-900">10,000+</p>
              <p className="text-blue-700">Lives Impacted</p>
            </div>
            <div className="glass-stat p-6 rounded-2xl animate-scale-in-delayed">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-blue-900">500+</p>
              <p className="text-blue-700">Active Donors</p>
            </div>
            <div className="glass-stat p-6 rounded-2xl animate-scale-in-more-delayed">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-blue-900">50+</p>
              <p className="text-blue-700">Projects Completed</p>
            </div>
          </div>
          <a
            href="#donate"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce-slow"
          >
            Make a Difference Today
          </a>
        </div>
      </div>
    </section>
  );
}
