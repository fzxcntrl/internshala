import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) onSearch(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  const suggestions = [
    "Marketing", "Work From Home", "Delhi", "Finance", "6 Months", "₹10,000+"
  ];

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="w-6 h-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by role, company, skill, or location..." 
          className="block w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-lg shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
        />
      </div>

      {/* Suggestion Chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500 font-semibold mr-1 animate-fade-in" style={{ animationDelay: '0ms' }}>Popular:</span>
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            className="opacity-0 animate-fade-in px-4 py-1.5 bg-white text-gray-700 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 rounded-full text-[13px] font-semibold transition-colors shadow-sm"
            style={{ animationDelay: `${(index + 1) * 75}ms` }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
