import React from 'react';

export default function Pricing() {
  return (
    <section className="py-20 container mx-auto">
      <h2 className="text-4xl font-bold text-emerald-900 mb-8">Our Pricing Plans</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 border rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold mb-4">Basic Plan</h3>
          <p className="text-3xl font-bold mb-4">$25/mo</p>
          <ul className="text-gray-600 mb-6"><li>Weekly Pickup</li><li>Recycling Bin</li></ul>
        </div>
        {/* Add more cards here */}
      </div>
    </section>
  );
}