"use client";

import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  mousePos: { x: number; y: number };
}

export default function MatrixRain({ mousePos }: MatrixRainProps) {
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

    const greekLetters = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω";
    const characters = greekLetters.split("");
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    
    // Array to track the Y coordinate of each drop
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start at random negative heights so they don't all fall together at once
    }

    let animationFrameId: number;

    const draw = () => {
      // Translucent black background creates the trail effect
      ctx.fillStyle = "rgba(3, 3, 3, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        // Pick a random Greek character
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Calculate distance from mouse using the ref
        const dx = x - mousePosRef.current.x;
        const dy = y - mousePosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If mouse is near, make it glow white and larger, otherwise make it the brand blue
        if (distance < 120) {
          ctx.fillStyle = "#FFFFFF";
          ctx.font = `bold ${fontSize + 4}px monospace`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#FFFFFF";
        } else {
          // Add some randomness to brightness based on drop
          const opacity = Math.random() > 0.9 ? 1 : 0.5;
          ctx.fillStyle = `rgba(0, 85, 255, ${opacity})`;
          ctx.font = `${fontSize}px monospace`;
          ctx.shadowBlur = 0;
        }

        // Only draw if y > 0
        if (y > 0) {
          ctx.fillText(text, x, y);
        }

        // Reset drop randomly when it reaches the bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Remove mousePos from dependencies so the canvas never resets

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen"
    />
  );
}
