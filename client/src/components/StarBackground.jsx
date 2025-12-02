import { useEffect, useRef } from "react";

export default function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numStars = 80;
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      opacity: Math.random(),
      speed: Math.random() * 0.1 + 0.003,
      direction: Math.random() > 0.4 ? 1 : -1,
    }));

    let animationFrameId;
    let lastTime = 0;

    const animate = (time) => {
      const delta = time - lastTime;
      if (delta < 16) {
        // ~60fps throttle
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter"; 
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.opacity += s.speed * s.direction;
        if (s.opacity > 1 || s.opacity < 0.1) s.direction *= -1;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{
        opacity: 0.6,
        transform: "translateZ(0)", 
        willChange: "transform, opacity",
        contain: "strict",
        imageRendering: "crisp-edges",
      }}
    />
  );
}
