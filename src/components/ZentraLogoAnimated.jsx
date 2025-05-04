"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function ZentraLogoAnimated({
  className,
  size = "md",
  variant = "default",
  showTagline = true,
  ...props
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const sizes = {
    xs: { canvas: 32, container: "h-8 w-8" },
    sm: { canvas: 48, container: "h-12 w-12" },
    md: { canvas: 64, container: "h-16 w-16" },
    lg: { canvas: 96, container: "h-24 w-24" },
    xl: { canvas: 128, container: "h-32 w-32" },
  };

  const textSizes = {
    xs: "text-lg",
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  const taglineSizes = {
    xs: "text-[0.6rem]",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const variants = {
    default: {
      primary: { start: "#004581", end: "#018ABD" },
      secondary: { start: "#018ABD", end: "#97CBDC" },
      text: "from-white to-[#97CBDC]",
      tagline: "text-[#97CBDC]",
      background: "#0a0f1a",
    },
    light: {
      primary: { start: "#0179a3", end: "#97CBDC" },
      secondary: { start: "#97CBDC", end: "#c9e6f0" },
      text: "from-[#0a0f1a] to-[#1D2538]",
      tagline: "text-[#1D2538]",
      background: "#ffffff",
    },
    dark: {
      primary: { start: "#003b6e", end: "#0179a3" },
      secondary: { start: "#0179a3", end: "#97CBDC" },
      text: "from-white to-[#97CBDC]",
      tagline: "text-[#97CBDC]",
      background: "#0a0f1a",
    },
  };

  const currentVariant = variants[variant];
  const canvasSize = sizes[size].canvas;
  const containerSize = sizes[size].container;
  const textSize = textSizes[size];
  const taglineSize = taglineSizes[size];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size accounting for device pixel ratio
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    ctx.scale(dpr, dpr);

    // Set canvas CSS size
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;

    let rotation = 0;
    let hue = 0;
    let particleAngle = 0;

    const drawLogo = (timestamp) => {
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Background
      ctx.fillStyle = currentVariant.background;
      ctx.beginPath();
      ctx.arc(canvasSize / 2, canvasSize / 2, canvasSize / 2, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring
      const ringGradient = ctx.createLinearGradient(
        0,
        canvasSize / 2,
        canvasSize,
        canvasSize / 2
      );
      ringGradient.addColorStop(0, currentVariant.primary.start);
      ringGradient.addColorStop(1, currentVariant.primary.end);

      ctx.strokeStyle = ringGradient;
      ctx.lineWidth = canvasSize * 0.04;
      ctx.beginPath();
      ctx.arc(
        canvasSize / 2,
        canvasSize / 2,
        canvasSize * 0.45,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      // Z shape with animation
      const zGradient = ctx.createLinearGradient(
        0,
        canvasSize / 2,
        canvasSize,
        canvasSize / 2
      );
      zGradient.addColorStop(0, currentVariant.secondary.start);
      zGradient.addColorStop(1, currentVariant.secondary.end);

      ctx.strokeStyle = zGradient;
      ctx.lineWidth = canvasSize * 0.08;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Save context for Z rotation
      ctx.save();
      ctx.translate(canvasSize / 2, canvasSize / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvasSize / 2, -canvasSize / 2);

      // Draw Z
      ctx.beginPath();
      ctx.moveTo(canvasSize * 0.3, canvasSize * 0.3);
      ctx.lineTo(canvasSize * 0.7, canvasSize * 0.3);
      ctx.lineTo(canvasSize * 0.3, canvasSize * 0.7);
      ctx.lineTo(canvasSize * 0.7, canvasSize * 0.7);
      ctx.stroke();

      ctx.restore();

      // Swap arrows with animation
      const arrowGradient = ctx.createLinearGradient(
        0,
        canvasSize / 2,
        canvasSize,
        canvasSize / 2
      );
      arrowGradient.addColorStop(0, currentVariant.primary.start);
      arrowGradient.addColorStop(1, currentVariant.primary.end);

      ctx.strokeStyle = arrowGradient;
      ctx.lineWidth = canvasSize * 0.04;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Left arrow
      ctx.save();
      ctx.translate(canvasSize / 2, canvasSize / 2);
      ctx.rotate((particleAngle * Math.PI) / 180);
      ctx.translate(-canvasSize / 2, -canvasSize / 2);

      ctx.beginPath();
      ctx.moveTo(canvasSize * 0.35, canvasSize * 0.4);
      ctx.lineTo(canvasSize * 0.25, canvasSize * 0.5);
      ctx.lineTo(canvasSize * 0.35, canvasSize * 0.6);
      ctx.stroke();

      ctx.restore();

      // Right arrow
      ctx.save();
      ctx.translate(canvasSize / 2, canvasSize / 2);
      ctx.rotate((-particleAngle * Math.PI) / 180);
      ctx.translate(-canvasSize / 2, -canvasSize / 2);

      ctx.beginPath();
      ctx.moveTo(canvasSize * 0.65, canvasSize * 0.4);
      ctx.lineTo(canvasSize * 0.75, canvasSize * 0.5);
      ctx.lineTo(canvasSize * 0.65, canvasSize * 0.6);
      ctx.stroke();

      ctx.restore();

      // Center dot (token)
      const centerGradient = ctx.createLinearGradient(
        canvasSize * 0.44,
        canvasSize * 0.44,
        canvasSize * 0.56,
        canvasSize * 0.56
      );
      centerGradient.addColorStop(0, currentVariant.secondary.start);
      centerGradient.addColorStop(1, currentVariant.secondary.end);

      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(
        canvasSize / 2,
        canvasSize / 2,
        canvasSize * 0.06,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Particles
      for (let i = 0; i < 5; i++) {
        const angle = ((particleAngle + i * 72) * Math.PI) / 180;
        const distance =
          canvasSize * (0.25 + Math.sin(timestamp / 1000 + i) * 0.05);

        const x = canvasSize / 2 + Math.cos(angle) * distance;
        const y = canvasSize / 2 + Math.sin(angle) * distance;

        const particleSize =
          canvasSize * 0.02 * (0.8 + Math.sin(timestamp / 500 + i) * 0.2);

        ctx.fillStyle = currentVariant.secondary.end;
        ctx.globalAlpha = 0.5 + Math.sin(timestamp / 500 + i) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Update animation values
      rotation = (rotation + 0.05) % 360;
      hue = (hue + 0.1) % 360;
      particleAngle = (particleAngle + 0.2) % 360;

      animationRef.current = requestAnimationFrame(drawLogo);
    };

    animationRef.current = requestAnimationFrame(drawLogo);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasSize, variant, currentVariant]);

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <div className={cn("relative", containerSize)}>
        {/* Glow effect */}
        <div
          className={cn(
            "absolute -inset-1 bg-gradient-to-r rounded-full blur opacity-70",
            `from-[${currentVariant.primary.start}] to-[${currentVariant.primary.end}]`
          )}
        />

        {/* Canvas for animated logo */}
        <div className="relative rounded-full overflow-hidden">
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            className="w-full h-full"
          />
        </div>
      </div>

      <div>
        <div className={cn("font-bold", textSize)}>
          <span
            className={cn(
              "bg-clip-text text-transparent bg-gradient-to-r",
              currentVariant.text
            )}
          >
            Zentra
          </span>
        </div>
        {showTagline && (
          <span
            className={cn(
              "block leading-tight",
              taglineSize,
              currentVariant.tagline
            )}
          >
            on Pharos Network
          </span>
        )}
      </div>
    </div>
  );
}
