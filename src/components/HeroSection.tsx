'use client'

import React from 'react';
import Image from 'next/image';

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-70 md:h-105 flex items-center justify-center text-center overflow-hidden mb-6 lg:mb-12">
      <Image
        fill
        priority
        src={HERO_IMAGE_URL}
        alt="Tjermin Marketplace Hero"
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-[#1E3A8A]/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-b from-[#172554]/60 via-[#1e3a8a]/70 to-[#0f172a]/80" />

      {/* Hero Content */}
      <div className="relative z-10 px-4 max-w-3xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Tjermin Marketplace
        </h1>
        <p className="text-sm sm:text-base text-slate-200 font-normal tracking-wide">
          Find your perfect things from our premium selection.
        </p>
      </div>
    </section>
  );
};