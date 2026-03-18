"use client";

import React, { Suspense, lazy } from 'react';
import { ApplyButton } from '@/components/ui/apply-button';

const Spline = lazy(() => import('@splinetool/react-spline'));

const OPEN_ROLES = [
  { slug: "product-engineer-intern", title: "Product Engineer Intern", team: "Engineering", type: "Internship" },
];

export const HeroSection = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden"
      style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>

      {/* Spline — tinted to match logo purple */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.4 }}>
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Spline
            style={{ width: '100%', height: '100%' }}
            scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
          />
        </Suspense>
      </div>

      {/* Gradient — heavy at bottom for readability */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.92) 25%, rgba(0,0,0,0.4) 55%, transparent 80%)'
        }} />

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-30 px-10 md:px-16 py-7">
        <a href="https://salesmonk.ai" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://framerusercontent.com/images/qlrjMZi3igRllRBKsGBe7WQE.png"
            alt="SalesMonk"
            style={{ height: '24px', width: 'auto' }}
          />
        </a>
      </nav>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-10 md:px-16 pb-14">
        <div className="max-w-2xl">

          <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-5">
            We're hiring
          </p>

          {/* Title — orange → purple matching the SalesMonk logo */}
          <h1 className="text-5xl md:text-6xl mb-10"
            style={{
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              background: 'linear-gradient(120deg, #f97316 0%, #a855f7 55%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            Come build the future<br />of GTM with us
          </h1>

          {/* Role row */}
          {OPEN_ROLES.map((role) => (
            <div key={role.slug} className="flex items-center justify-between py-4 border-t border-white/10">
              <div>
                <p className="text-white text-base">{role.title}</p>
                <p className="text-white/35 text-xs mt-0.5">{role.type}</p>
              </div>
              <ApplyButton href={`/sign-in?redirect_url=/apply/${role.slug}`} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
