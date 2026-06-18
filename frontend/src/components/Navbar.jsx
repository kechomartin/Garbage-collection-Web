import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-emerald-800/95 backdrop-blur-md text-white sticky top-0 z-50 shadow-lg border-b border-emerald-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="p-2 bg-lime-500 rounded-lg"><Truck className="h-6 w-6 text-emerald-900" /></div>
            <span className="text-2xl font-bold tracking-tight">CleanCity</span>
          </Link>

          <div className="hidden md:flex space-x-8 font-medium">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="relative group hover:text-lime-400 transition-colors">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <Link to="/contact" className="hidden md:block bg-lime-500 text-emerald-900 px-6 py-2 rounded-full font-bold hover:bg-lime-400 transition-all">
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}