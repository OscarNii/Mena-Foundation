import { useState, useEffect } from 'react';
import { supabase, GalleryImage } from '../lib/supabase';
import { Image as ImageIcon } from 'lucide-react';

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

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
      image_url: 'https://images.pexels.com/photos/8422403/pexels-photo-8422403.jpeg?auto=compress&cs=tinysrgb&w=800',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Medical Camp Success',
      description: 'Free health checkups and medicines distributed to 500+ families',
      image_url: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Community Kitchen',
      description: 'Daily meals served to underprivileged community members',
      image_url: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Clean Water Initiative',
      description: 'Installing water purification systems in remote villages',
      image_url: 'https://images.pexels.com/photos/6646914/pexels-photo-6646914.jpeg?auto=compress&cs=tinysrgb&w=800',
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Women Empowerment Program',
      description: 'Skill development training for 150 women entrepreneurs',
      image_url: 'https://images.pexels.com/photos/6646919/pexels-photo-6646919.jpeg?auto=compress&cs=tinysrgb&w=800',
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Orphanage Support',
      description: 'Monthly support and care for 80 orphaned children',
      image_url: 'https://images.pexels.com/photos/8363030/pexels-photo-8363030.jpeg?auto=compress&cs=tinysrgb&w=800',
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
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
      </div>
    </section>
  );
}
