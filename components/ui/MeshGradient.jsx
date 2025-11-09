import { useEffect, useRef } from 'react';

export default function MeshGradientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createGrainParticles();
    };

    const createGrainParticles = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const random = Math.random();
        if (random > 0.985) {
          const brightness = 300 + Math.random() * 55;
          data[i] = brightness;
          data[i + 1] = brightness;
          data[i + 2] = brightness;
          data[i + 3] = Math.random() * 100 + 100;
        } else {
          data[i + 3] = 0;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Mesh gradient layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, #10b981 0%, transparent 40%),
            radial-gradient(circle at 85% 85%, #10b981 0%, transparent 40%),
            #000000
          `,
          filter: 'blur(80px) contrast(140%)',
        }}
      />
      
      {/* Grain overlay */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      
      {/* Dark overlay for content readability */}
      <div className="absolute inset-0 bg-neutral-950/40" />
    </div>
  );
};