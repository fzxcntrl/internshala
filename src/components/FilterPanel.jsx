import { useState } from 'react';

export default function FilterPanel({ filters, setFilter, resetFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleProfileChange = (e) => setFilter('profile', e.target.value);
  const handleLocationChange = (e) => setFilter('location', e.target.value);
  const handleDurationChange = (e) => setFilter('duration', e.target.value);
  const handleStipendChange = (e) => setFilter('minStipend', Number(e.target.value));

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-gray-800 font-semibold"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Filters
          </span>
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>

      {/* Main Panel Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-gray-100`}>
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Filters
          </h2>
          <button 
            onClick={resetFilters}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-6">
          {/* Section 1: Profile */}
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-2">Profile</label>
            <input 
              type="text" 
              value={filters.profile}
              onChange={handleProfileChange}
              placeholder="e.g. Marketing, Finance" 
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder-gray-400 text-gray-900" 
            />
          </div>

          {/* Section 2: Location */}
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-2">Location</label>
            <input 
              type="text" 
              value={filters.location}
              onChange={handleLocationChange}
              placeholder="e.g. Delhi, Mumbai, Work From Home" 
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder-gray-400 text-gray-900" 
            />
          </div>

          {/* Section 3: Duration */}
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-2">Duration</label>
            <select 
              value={filters.duration}
              onChange={handleDurationChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all appearance-none bg-white text-gray-900"
              style={{
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem top 50%',
                backgroundSize: '0.65rem auto'
              }}
            >
              <option value="">Any</option>
              <option value="1-3">1-3 Months</option>
              <option value="3-6">3-6 Months</option>
              <option value="6+">6+ Months</option>
            </select>
          </div>

          {/* Section 4: Stipend */}
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-2">Minimum Stipend</label>
            <select 
              value={filters.minStipend}
              onChange={handleStipendChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all appearance-none bg-white text-gray-900"
              style={{
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem top 50%',
                backgroundSize: '0.65rem auto'
              }}
            >
              <option value={0}>Any</option>
              <option value={2000}>₹2,000+ / month</option>
              <option value={5000}>₹5,000+ / month</option>
              <option value={10000}>₹10,000+ / month</option>
              <option value={15000}>₹15,000+ / month</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
