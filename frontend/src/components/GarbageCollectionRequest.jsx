import React, { useState } from "react";

const GarbageCollectionRequest = () => {
  const [serviceType, setServiceType] = useState("immediate");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude}, ${longitude}`);
      },
      () => alert("Unable to retrieve your location.")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Request Submitted:\nService: ${serviceType}\nLocation: ${location || address}`
    );
  };

  return (
    <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <img src="/oak-logo.png" alt="Oak Tree Logo" className="w-12 h-12" />
        <h1 className="text-2xl font-bold text-teal-700">Garbage Collection</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Service Type
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="immediate">Immediate</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>

        {serviceType === "immediate" ? (
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleLocationClick}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Use My Location
            </button>
            {location && (
              <p className="text-sm text-teal-800">Location: {location}</p>
            )}
          </div>
        ) : (
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Enter Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="123 Main St, City"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition w-full"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default GarbageCollectionRequest;