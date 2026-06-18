import React from 'react';
import { Truck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-emerald-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <Truck className="h-6 w-6 text-lime-500" />
            <span className="text-xl font-bold text-white">CleanCity</span>
          </div>
          
          <div className="text-center md:text-right text-sm text-emerald-300">
            <p>© {new Date().getFullYear()} CleanCity Waste Management.</p>
            <p>Committed to a cleaner, greener environment.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}