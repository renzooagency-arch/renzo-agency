"use client";

import React, { useEffect, useRef } from 'react';

interface NeuralNetworkProps {
  mousePos: { x: number; y: number };
}

export default function NeuralNetwork({ mousePos }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef(mousePos);

  // Keep mousePosRef updated without triggering useEffect re-runs
  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 100;
    const connectionDistance = 150;
    const mouseConnectionDistance = 200;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1, // Velocity X
        vy: (Math.random() - 0.5) * 1, // Velocity Y
        radius: Math.random() * 2 + 1, // Radius 1-3px
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles and update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 85, 255, 0.8)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0, 85, 255, 0.8)";
        ctx.fill();

        // Check connections with other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 85, 255, ${1 - dist / connectionDistance})`;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }

        // Check connection with mouse
        const mouseDx = p.x - mousePosRef.current.x;
        const mouseDy = p.y - mousePosRef.current.y;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (mouseDist < mouseConnectionDistance) {
          // Connect to mouse
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePosRef.current.x, mousePosRef.current.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - mouseDist / mouseConnectionDistance})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Mouse pushes particles away slightly
          const pushFactor = (mouseConnectionDistance - mouseDist) / mouseConnectionDistance;
          p.x += (mouseDx / mouseDist) * pushFactor * 2;
          p.y += (mouseDy / mouseDist) * pushFactor * 2;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen"
    />
  );
}
