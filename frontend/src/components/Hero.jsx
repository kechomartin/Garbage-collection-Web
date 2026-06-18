import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Professional Waste Management</h1>
          <p className="text-xl mb-8 opacity-90">Eco-friendly garbage collection for a sustainable future.</p>
          <button className="bg-lime-500 text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-lime-400 transition flex items-center">
            Schedule Pickup <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}