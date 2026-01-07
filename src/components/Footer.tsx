import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Mena Charity Foundation</h3>
            <p className="text-blue-200 leading-relaxed">
              Dedicated to making a positive impact in communities worldwide through compassion and action.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-blue-200 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-blue-200 hover:text-white transition-colors">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="#donate" className="text-blue-200 hover:text-white transition-colors">
                  Donate Now
                </a>
              </li>
              <li>
                <a href="#contact" className="text-blue-200 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <p className="text-blue-200 mb-4">
              Stay updated on our latest programs and success stories.
            </p>
            <a
              href="mailto:info@menacharityfoundation.org"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 text-center">
          <p className="text-blue-200 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-400 animate-pulse" /> by Mena Charity Foundation
          </p>
          <p className="text-blue-300 mt-2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
