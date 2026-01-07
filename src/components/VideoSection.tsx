import React from 'react';

interface VideoSectionProps {
  videoUrl?: string;
}

function extractYouTubeId(url: string) {
  const regex = /(?:v=|\/embed\/|youtu.be\/|shorts\/|v\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function VideoSection({ videoUrl = 'https://www.youtube.com/shorts/YNCi0ZV4amM?feature=share' }: VideoSectionProps) {
  const id = extractYouTubeId(videoUrl);
  const embed = id ? `https://www.youtube.com/embed/${id}` : null;

  return (
    <section id="video" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">Watch Our Story</h2>
          <p className="text-blue-700">A short video about our mission and work.</p>
        </div>

        <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-black">
          <div className="relative" style={{ paddingTop: '56.25%' }}>
            {embed ? (
              <iframe
                src={embed}
                title="Mena Video"
                className="absolute inset-0 w-full h-full"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white">Invalid YouTube URL</div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center">
          <a href={videoUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
            Open video on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
