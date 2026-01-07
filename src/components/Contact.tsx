import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  const emailAddress = 'info@menacharityfoundation.org';
  const phoneNumber = '+1 (234) 567-8900';
  const address = '123 Charity Street, Hope City, HC 12345';

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-blue-700">
            We'd love to hear from you. Reach out to learn more about our work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="glass-card p-6 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Email Us</h3>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors break-all"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Call Us</h3>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Visit Us</h3>
                  <p className="text-blue-700">{address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Send us a Message</h3>
            <a
              href={`mailto:${emailAddress}?subject=Inquiry from Website&body=Hello Mena Charity Foundation,%0D%0A%0D%0AI would like to inquire about...`}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Compose Email
            </a>
            <p className="text-blue-600 text-sm mt-4 text-center">
              Click to open your email client
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
