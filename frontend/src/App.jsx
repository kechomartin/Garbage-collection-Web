import React, { useState } from 'react';
import { 
  Calendar, 
  Truck, 
  Recycle, 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [wasteType, setWasteType] = useState('general');

  const handleSchedulePickup = (e) => {
    e.preventDefault();
    alert(`Pickup scheduled for ${scheduleDate} (${wasteType} waste)`);
    setScheduleDate('');
    setWasteType('general');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-emerald-700 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8" />
              <span className="text-2xl font-bold">CleanCity</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-emerald-200 transition">Home</a>
              <a href="#services" className="hover:text-emerald-200 transition">Services</a>
              <a href="#schedule" className="hover:text-emerald-200 transition">Schedule</a>
              <a href="#pricing" className="hover:text-emerald-200 transition">Pricing</a>
              <a href="#contact" className="hover:text-emerald-200 transition">Contact</a>
            </div>
            
            <div className="hidden md:block">
              <button className="bg-white text-emerald-700 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 transition">
                Book Now
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="hover:text-emerald-200 transition">Home</a>
                <a href="#services" className="hover:text-emerald-200 transition">Services</a>
                <a href="#schedule" className="hover:text-emerald-200 transition">Schedule</a>
                <a href="#pricing" className="hover:text-emerald-200 transition">Pricing</a>
                <a href="#contact" className="hover:text-emerald-200 transition">Contact</a>
                <button className="bg-white text-emerald-700 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 transition">
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional Waste Management Services
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Reliable, eco-friendly garbage collection for homes and businesses. 
              We make waste disposal simple and sustainable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-emerald-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-50 transition flex items-center justify-center">
                Schedule Pickup <ChevronRight className="ml-2" />
              </button>
              <button className="bg-transparent border-2 border-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/10 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="h-12 w-12" />,
                title: "Residential Pickup",
                description: "Weekly garbage collection for homes with eco-friendly disposal methods"
              },
              {
                icon: <Recycle className="h-12 w-12" />,
                title: "Recycling Services",
                description: "Separate collection and processing of recyclable materials"
              },
              {
                icon: <AlertTriangle className="h-12 w-12" />,
                title: "Hazardous Waste",
                description: "Safe disposal of hazardous materials with proper protocols"
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-emerald-600 mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Schedule a Pickup</h2>
            <form onSubmit={handleSchedulePickup} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Pickup Date</label>
                <div className="flex items-center">
                  <Calendar className="text-gray-400 mr-3" />
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Waste Type</label>
                <div className="grid grid-cols-2 gap-4">
                  {['general', 'recyclable', 'hazardous', 'bulk'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="wasteType"
                        value={type}
                        checked={wasteType === type}
                        onChange={(e) => setWasteType(e.target.value)}
                        className="text-emerald-600"
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Special Instructions</label>
                <textarea
                  rows="3"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Any special instructions for our team..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
              >
                Confirm Pickup Schedule
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "95%", label: "On-time Pickups" },
              { value: "50K+", label: "Tons Recycled" },
              { value: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Contact Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Phone className="h-8 w-8" />,
                  title: "Call Us",
                  details: "+1 (555) 123-4567",
                  subtitle: "Available 24/7"
                },
                {
                  icon: <MapPin className="h-8 w-8" />,
                  title: "Visit Office",
                  details: "123 Clean Street, Green City",
                  subtitle: "Open 8AM-6PM"
                },
                {
                  icon: <Clock className="h-8 w-8" />,
                  title: "Pickup Hours",
                  details: "Monday - Saturday",
                  subtitle: "6AM - 8PM"
                }
              ].map((contact, index) => (
                <div key={index} className="text-center p-6 bg-gray-800 rounded-xl">
                  <div className="inline-block p-3 bg-emerald-600 rounded-full mb-4">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                  <p className="text-lg mb-1">{contact.details}</p>
                  <p className="text-gray-400">{contact.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Truck className="h-6 w-6" />
              <span className="text-xl font-bold">CleanCity</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© {new Date().getFullYear()} CleanCity Waste Management. All rights reserved.</p>
              <p className="mt-2">Committed to a cleaner, greener environment.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;