import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function ScheduleForm() {
  const [scheduleDate, setScheduleDate] = useState('');
  const [wasteType, setWasteType] = useState('general');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Scheduling...');

    try {
      const response = await fetch('http://localhost:3000/api/schedule', { // Adjust port if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: scheduleDate, type: wasteType }),
      });

      if (response.ok) {
        setStatus('Pickup Scheduled Successfully!');
        setScheduleDate('');
      } else {
        setStatus('Error scheduling pickup.');
      }
    } catch (error) {
      setStatus('Failed to connect to server.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-lime-500">
      <h2 className="text-2xl font-bold mb-6 text-emerald-900">Schedule a Pickup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border p-3 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500">
          <Calendar className="text-emerald-600 mr-2" />
          <input 
            type="date" 
            className="w-full outline-none" 
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-emerald-800 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition">
          Confirm Schedule
        </button>
      </form>
      {status && <p className="mt-4 text-center font-medium text-emerald-700">{status}</p>}
    </div>
  );
}