import { useState, useEffect } from 'react';
import { supabase, GalleryImage } from '../lib/supabase';
import { Image as ImageIcon } from 'lucide-react';

// Import all images from the imgs folder
import img1 from '../imgs/PHOTO-2025-09-25-02-11-17.jpg';
import img2 from '../imgs/PHOTO-2025-09-25-02-08-18.jpg';
import img3 from '../imgs/PHOTO-2025-09-25-02-08-22.jpg';
import img4 from '../imgs/PHOTO-2025-09-25-02-13-44.jpg';
import img5 from '../imgs/PHOTO-2025-09-25-02-11-32.jpg';
import img6 from '../imgs/PHOTO-2025-09-25-08-45-29.jpg';

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedImage, setExpandedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  async function loadGalleryImages() {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setLoading(false);
    }
  }

  const placeholderImages = [
    {
      id: '1',
      title: 'School Supplies Distribution',
      description: 'Providing essential educational materials to 200 children in rural communities',
      image_url: img1,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Medical Camp Success',
      description: 'Free health checkups and medicines distributed to 500+ families',
      image_url: img2,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Community Kitchen',
      description: 'Daily meals served to underprivileged community members',
      image_url: img3,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Clean Water Initiative',
      description: 'Installing water purification systems in remote villages',
      image_url: img4,
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Women Empowerment Program',
      description: 'Skill development training for 150 women entrepreneurs',
      image_url: img5,
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Orphanage Support',
      description: 'Monthly support and care for 80 orphaned children',
      image_url: img6,
      created_at: new Date().toISOString()
    }
  ];

  const displayImages = images.length > 0 ? images : placeholderImages;

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Our Impact Stories
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            See the difference your donations have made in the lives of those we serve
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayImages.map((image, index) => (
              <div
                key={image.id}
                className="glass-card rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 bg-blue-100 overflow-hidden group">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    onClick={() => setExpandedImage(image)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = img1;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
                    <div className="p-4 w-full">
                      <ImageIcon className="w-8 h-8 text-white mb-2" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{image.title}</h3>
                  <p className="text-blue-700 leading-relaxed">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expanded Image Modal */}
        {expandedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setExpandedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative">
                <img
                  src={expandedImage.image_url}
                  alt={expandedImage.title}
                  className="w-full max-h-[70vh] object-contain bg-gray-900"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = img1;
                  }}
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-blue-900 mb-4">{expandedImage.title}</h3>
                <p className="text-xl text-blue-700 leading-relaxed">{expandedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

