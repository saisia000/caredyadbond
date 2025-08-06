import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ThankYouPageProps {
  children: React.ReactNode;
}

export const ThankYouPage = ({ children }: ThankYouPageProps) => {
  useEffect(() => {
    // Trigger confetti animation when component mounts
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Left side confetti
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#f03cb7', '#bcf731', '#ff69b4', '#98fb98', '#dda0dd']
      });
      
      // Right side confetti
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#f03cb7', '#bcf731', '#ff69b4', '#98fb98', '#dda0dd']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <div className="animate-float-heart">
              <div className="relative">
                <div 
                  className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-full shadow-lg"
                  style={{
                    clipPath: 'polygon(50% 85%, 20% 40%, 50% 15%, 80% 40%)',
                    filter: 'drop-shadow(0 4px 8px rgba(240, 60, 183, 0.3))'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Content with gentle bounce animation */}
      <div className="animate-gentle-bounce">
        {children}
      </div>
    </div>
  );
};