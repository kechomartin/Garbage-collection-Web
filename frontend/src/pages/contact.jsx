import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-emerald-900 mb-12 text-center">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-lime-500 rounded-full text-emerald-900"><Phone /></div>
              <p className="text-lg font-medium">+254 700 000 000</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-lime-500 rounded-full text-emerald-900"><Mail /></div>
              <p className="text-lg font-medium">support@cleancity.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-lime-500 rounded-full text-emerald-900"><MapPin /></div>
              <p className="text-lg font-medium">Kitale, Trans-Nzoia, Kenya</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white p-8 rounded-2xl shadow-lg space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-lime-500 outline-none" />
            <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-lime-500 outline-none" />
            <textarea placeholder="Your Message" rows="4" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"></textarea>
            <button className="w-full bg-emerald-800 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}