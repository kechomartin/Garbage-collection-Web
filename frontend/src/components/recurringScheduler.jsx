import React, { useState } from "react";

const RecurringScheduler = ({ onSchedule }) => {
  const [frequency, setFrequency] = useState("daily");
  const [time, setTime] = useState("08:00");
  const [startDate, setStartDate] = useState(() =>
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const schedule = {
      frequency,
      time,
      startDate,
    };
    console.log("Scheduled:", schedule);
    onSchedule && onSchedule(schedule); // optional callback
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-teal-800">Schedule Recurring Pickup</h2>

      <div>
        <label className="block mb-1 font-medium text-sm">Frequency:</label>
        <select
          className="w-full border rounded p-2"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Pickup Time:</label>
        <input
          type="time"
          className="w-full border rounded p-2"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-sm">Start Date:</label>
        <input
          type="date"
          className="w-full border rounded p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
      >
        Schedule Pickup
      </button>
    </form>
  );
};

export default RecurringScheduler;
