import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface SplashProps {
  duration?: number; // total time to show splash (ms)
  fadeDuration?: number; // fade-out duration (ms)
  onFinish?: () => void;
}

export function Splash({ duration = 5000, fadeDuration = 600, onFinish }: SplashProps) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startFade = setTimeout(() => setFading(true), Math.max(0, duration - fadeDuration));
    const finish = setTimeout(() => {
      onFinish?.();
    }, duration);

    return () => {
      clearTimeout(startFade);
      clearTimeout(finish);
    };
  }, [duration, fadeDuration, onFinish]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{
        opacity: fading ? 0 : 1,
        transition: `opacity ${fadeDuration}ms ease`,
        pointerEvents: fading ? 'none' : 'auto'
      }}
    >
      <div
        className="relative flex flex-col items-center gap-6"
        style={{
          transform: fading ? 'scale(0.95)' : 'scale(1)',
          transition: `transform ${fadeDuration}ms cubic-bezier(.2,.8,.2,1)`
        }}
      >
        <div
          className="relative p-2 rounded-full shadow-2xl bg-transparent"
          style={{ animation: 'logoPulse 2000ms ease-in-out infinite' }}
        >
          <img
            src={new URL('../imgs/Mena Logo.png', import.meta.url).href}
            alt="Mena Logo"
            className="object-contain"
            style={{ width: '50vmin', height: '50vmin', filter: 'drop-shadow(0 10px 30px rgba(99,102,241,0.45))' }}
          />
        </div>
        {/* <h1 className="text-white text-2xl md:text-3xl font-extrabold tracking-wide opacity-90">Mena Impact Foundation</h1> */}
      </div>
    </div>
  );
}

export default Splash;
