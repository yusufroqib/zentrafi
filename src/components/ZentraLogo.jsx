"use client";

import { cn } from "@/lib/utils";

export function ZentraLogo({
  className,
  size = "md",
  variant = "default",
  showTagline = true,
  animated = false,
  ...props
}) {
  const sizes = {
    xs: "h-8 w-8",
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
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
      primary: "from-[#004581] to-[#018ABD]",
      secondary: "from-[#018ABD] to-[#97CBDC]",
      text: "from-white to-[#97CBDC]",
      tagline: "text-[#97CBDC]",
    },
    light: {
      primary: "from-[#0179a3] to-[#97CBDC]",
      secondary: "from-[#97CBDC] to-[#c9e6f0]",
      text: "from-[#0a0f1a] to-[#1D2538]",
      tagline: "text-[#1D2538]",
    },
    dark: {
      primary: "from-[#003b6e] to-[#0179a3]",
      secondary: "from-[#0179a3] to-[#97CBDC]",
      text: "from-white to-[#97CBDC]",
      tagline: "text-[#97CBDC]",
    },
  };

  const currentVariant = variants[variant];
  const logoSize = sizes[size];
  const textSize = textSizes[size];
  const taglineSize = taglineSizes[size];

  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <div className={cn("relative", logoSize)}>
        {/* Glow effect */}
        <div
          className={cn(
            "absolute -inset-1 bg-gradient-to-r rounded-full blur opacity-70",
            currentVariant.primary,
            animated && "animate-pulse-glow"
          )}
        />

        {/* Main logo container */}
        <div
          className={cn(
            "relative bg-[#0a0f1a]/80 rounded-full p-[15%] flex items-center justify-center"
          )}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient
                id="primaryGradient"
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#004581" />
                <stop offset="1" stopColor="#018ABD" />
              </linearGradient>
              <linearGradient
                id="secondaryGradient"
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#018ABD" />
                <stop offset="1" stopColor="#97CBDC" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#primaryGradient)"
              strokeWidth="4"
              fill="none"
            />

            {/* Z shape */}
            <path
              d="M30 30H70L30 70H70"
              stroke="url(#secondaryGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />

            {/* Swap arrows */}
            <path
              d="M35 40L25 50L35 60"
              stroke="url(#primaryGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
            <path
              d="M65 40L75 50L65 60"
              stroke="url(#primaryGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />

            {/* Center dot (representing token/launch) */}
            <circle cx="50" cy="50" r="6" fill="url(#secondaryGradient)" />
          </svg>
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
