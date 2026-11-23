"use client";

import React from "react";
import "./BowLoader.css";

interface BowLoaderProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export default function BowLoader({
  label = "Loading sacred records...",
  size = "md",
}: BowLoaderProps) {
  const scaleClass =
    size === "sm" ? "scale-75" : size === "lg" ? "scale-125" : "scale-100";

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 select-none animate-fade-in">
      <div className={`bow-loader ${scaleClass}`}>
        <svg viewBox="0 0 280 120" className="bow-svg">
          <defs>
            {/* Sacred Dhanush Metal Gradient (Temple bronze & deep saffron hues) */}
            <linearGradient id="metal" x2="1">
              <stop offset="0%" stopColor="#34251E" />
              <stop offset="50%" stopColor="#C66A24" />
              <stop offset="100%" stopColor="#5C2E1F" />
            </linearGradient>

            {/* Sacred Golden Arrow Gradient */}
            <linearGradient id="gold" x2="1">
              <stop offset="0%" stopColor="#A66B20" />
              <stop offset="45%" stopColor="#FFE6A0" />
              <stop offset="100%" stopColor="#D69A35" />
            </linearGradient>

            {/* Divine Trail Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Bow (Kodanda Dhanush) */}
          <path
            d="M55 12 Q112 60 55 108"
            fill="none"
            stroke="url(#metal)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Bowstring */}
          <path
            d="M55 12 L55 108"
            className="bow-string"
            stroke="#B89555"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Arrow trail glow */}
          <path
            d="M65 60 H255"
            className="arrow-trail"
            stroke="#F59E0B"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
          />

          {/* Arrow */}
          <g className="arrow">
            <path
              d="M55 60 H235"
              stroke="url(#gold)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Arrowhead */}
            <path
              d="M235 51 L255 60 L235 69 Z"
              fill="#E8B653"
              stroke="#A66B20"
              strokeWidth="0.5"
            />
            {/* Feather fletching */}
            <path
              d="M65 60 L46 49 L51 60 L46 71 Z"
              fill="#C66A24"
            />
          </g>
        </svg>
      </div>

      {label && (
        <p className="font-serif text-xs font-semibold tracking-wider text-[#C66A24] animate-pulse">
          ॥ {label} ॥
        </p>
      )}
    </div>
  );
}
