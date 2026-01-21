import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const whatsappNumber = '+31685104250';
  const message = 'Hello Mena Charity Foundation, I would like to learn more about your programs.';

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-6 bottom-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
        <div className="relative glass-card bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform group-hover:scale-110">
          <MessageCircle className="w-8 h-8" />
        </div>
      </div>
      <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="glass-card bg-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-blue-900">Chat with us!</p>
        </div>
      </div>
    </a>
  );
}
