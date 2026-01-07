import { Target, Eye, Smile } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            About Our Mission
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Dedicated to creating positive change in communities worldwide through sustainable programs and compassionate action.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">Our Mission</h3>
            <p className="text-blue-700 text-center leading-relaxed">
              To empower underprivileged communities through education, healthcare, and sustainable development initiatives.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">Our Vision</h3>
            <p className="text-blue-700 text-center leading-relaxed">
              A world where every individual has access to basic necessities and opportunities to thrive and succeed.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Smile className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">Our Impact</h3>
            <p className="text-blue-700 text-center leading-relaxed">
              Creating lasting change through transparency, accountability, and community-focused programs that make a real difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
