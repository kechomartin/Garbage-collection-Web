import React from 'react';
import { Truck, Recycle, AlertTriangle } from 'lucide-react';

export default function Services() {
  const services = [
    { icon: <Truck />, title: "Residential", desc: "Weekly home collection." },
    { icon: <Recycle />, title: "Recycling", desc: "Sustainable material processing." },
    { icon: <AlertTriangle />, title: "Hazardous", desc: "Safe disposal protocols." }
  ];
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div key={i} className="p-8 rounded-2xl bg-emerald-50 border border-emerald-100 hover:shadow-xl transition">
            <div className="text-emerald-600 mb-4">{s.icon}</div>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}