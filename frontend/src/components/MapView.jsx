import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Fetch initial data
    fetch('http://localhost:3000/api/agents/nearby')
      .then(res => res.json())
      .then(data => setAgents(data));

    // WebSocket connection
    const socket = new WebSocket('ws://localhost:3000');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'allAgents') setAgents(data.agents);
      else if (data.type === 'agentUpdate') {
        setAgents(prev => prev.map(a => a.id === data.agent.id ? data.agent : a));
      }
    };
    return () => socket.close();
  }, []);

  return (
    <section id="map" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-emerald-900">Live Agent Tracking</h2>
        {/* Map Container must have a defined height */}
        <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-100">
          <MapContainer center={[-1.2921, 36.8219]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {agents.map(agent => (
              <Marker key={agent.id} position={[agent.lat, agent.lng]}>
                <Popup>
                  <div className="font-bold">{agent.name}</div>
                  <div className="text-sm">Status: {agent.status}</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}