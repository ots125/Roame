'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TripForm() {
  const [budget, setBudget] = useState('');
  const [locations, setLocations] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budget, locations, travelDates, interests }),
      });

      const data = await res.json();
      setItinerary(data.itinerary || 'Something went wrong.');
    } catch (err) {
      console.error(err);
      setItinerary('Error generating itinerary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl backdrop-blur-sm bg-white/80 shadow-2xl rounded-3xl border border-gray-200 p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          ✈️ Plan Your Dream Trip
        </h1>

        <div className="grid gap-5">
          <input
            type="text"
            placeholder="💸 e.g. $2000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70 backdrop-blur"
          />

          <input
            type="text"
            placeholder="📍 e.g. Italy"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70 backdrop-blur"
          />

          <input
            type="text"
            placeholder="📅 e.g. July 1–10, 2026"
            value={travelDates}
            onChange={(e) => setTravelDates(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70 backdrop-blur"
          />

          <textarea
            placeholder="🎯 e.g. food, beaches, hiking, museums"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            rows={3}
            className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70 backdrop-blur"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`py-3 text-lg font-semibold tracking-wide rounded-xl transition duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Generating...
              </span>
            ) : '🚀 Generate Itinerary'}
          </button>
        </div>

        {itinerary && (
          <div className="mt-8">
            <div className="p-6 rounded-xl bg-white/90 shadow-inner border border-gray-200 max-h-[400px] overflow-y-auto whitespace-pre-wrap text-sm text-gray-800">
              {itinerary}
            </div>
            <div className="mt-4 text-center">
              <Link href="mailto:feedback@roame.ai" className="text-blue-600 underline text-sm">
                💬 Send Feedback
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
