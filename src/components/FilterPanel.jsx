import { useState } from 'react';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function FilterPanel({ filters, setFilter, resetFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stipendValue, setStipendValue] = useState(filters.minStipend || 0);

  const handleProfileChange = (e) => setFilter('profile', e.target.value);
  const handleLocationChange = (e) => setFilter('location', e.target.value);
  const handleDurationChange = (e) => setFilter('duration', e.target.value);
  const handleStipendChange = (e) => {
    const val = Number(e.target.value);
    setStipendValue(val);
    setFilter('minStipend', val);
  };
  const handleDateChange = (e) => setFilter('startDate', e.target.value);

  // New Checkbox states
  const [cityChecked, setCityChecked] = useState(false);
  const [wfhChecked, setWfhChecked] = useState(false);
  const [partTimeChecked, setPartTimeChecked] = useState(false);

  const [jobOfferChecked, setJobOfferChecked] = useState(false);
  const [fastResponseChecked, setFastResponseChecked] = useState(false);
  const [earlyApplicantChecked, setEarlyApplicantChecked] = useState(false);
  const [womenChecked, setWomenChecked] = useState(false);
  
  const [keyword, setKeyword] = useState('');

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-gray-800 font-semibold"
        >
          <span className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-700" />
            Filters
          </span>
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>

      {/* Main Panel Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white p-5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)]`}>
        <div className="flex items-center justify-center text-center mb-6">
          <FunnelIcon className="w-5 h-5 text-gray-700 mr-2" />
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        </div>

        <div className="space-y-5">
          {/* Section a: Profile */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Profile</label>
            <input 
              type="text" 
              value={filters.profile || ''}
              onChange={handleProfileChange}
              placeholder="e.g. Marketing" 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008bdc] placeholder-gray-400 text-gray-900" 
            />
          </div>

          {/* Section b: Location */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Location</label>
            <input 
              type="text" 
              value={filters.location || ''}
              onChange={handleLocationChange}
              placeholder="e.g. Delhi" 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008bdc] placeholder-gray-400 text-gray-900 mb-3" 
            />
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={cityChecked} onChange={() => setCityChecked(!cityChecked)} className="w-4 h-4 text-[#008bdc] border-gray-300 rounded focus:ring-[#008bdc]" />
                Internships in my city
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={wfhChecked} onChange={() => {
                  setWfhChecked(!wfhChecked);
                  setFilter('location', !wfhChecked ? 'Work From Home' : '');
                }} className="w-4 h-4 text-[#008bdc] border-gray-300 rounded focus:ring-[#008bdc]" />
                Work from home
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={partTimeChecked} onChange={() => setPartTimeChecked(!partTimeChecked)} className="w-4 h-4 text-[#008bdc] border-gray-300 rounded focus:ring-[#008bdc]" />
                Part-time
              </label>
            </div>
          </div>

          {/* Section c: Stipend */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Desired minimum monthly stipend (₹)</label>
            <div className="px-1 mt-2">
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="1000" 
                value={stipendValue}
                onChange={handleStipendChange}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#008bdc]"
                style={{
                  background: `linear-gradient(to right, #008bdc ${(stipendValue / 10000) * 100}%, #e5e7eb ${(stipendValue / 10000) * 100}%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0</span>
                <span>2K</span>
                <span>4K</span>
                <span>6K</span>
                <span>8K</span>
                <span>10K</span>
              </div>
            </div>
          </div>

          {/* Section d: Starting from */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Starting from (or after)</label>
            <input 
              type="date"
              onChange={handleDateChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008bdc] text-gray-700" 
              placeholder="Choose date"
            />
          </div>

          {/* Section e: Max duration */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Max. duration (months)</label>
            <select 
              value={filters.duration || ''}
              onChange={handleDurationChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008bdc] text-gray-700 bg-white"
            >
              <option value="">Choose duration</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="6">6</option>
            </select>
          </div>

          {/* Section f: Checkboxes */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={jobOfferChecked} onChange={() => setJobOfferChecked(!jobOfferChecked)} className="w-4 h-4 text-[#008bdc] border-gray-300 rounded focus:ring-[#008bdc]" />
              Internships with job offer <span className="text-gray-400 ml-1">ⓘ</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={fastResponseChecked} onChange={() => setFastResponseChecked(!fastResponseChecked)} className="w-4 h-4 text-[#008bdc] border-gray-300 rounded focus:ring-[#008bdc]" />
              Fast response <span className="text-gray-400 ml-1">ⓘ</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={earlyApplicantChecked} onChange={() => setEarlyApplicantChecked(!earlyApplicantChecked)} className="w-4 h-4 text-[#008bdc] border-gray-300 rounded focus:ring-[#008bdc]" />
              Early applicant <span className="text-gray-400 ml-1">ⓘ</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={womenChecked} onChange={() => setWomenChecked(!womenChecked)} className="w-4 h-4 text-[#008bdc] border-gray-300 rounded focus:ring-[#008bdc]" />
              Internships for women <span className="text-gray-400 ml-1">ⓘ</span>
            </label>
          </div>

          {/* Section g: Clear all */}
          <div className="flex justify-end pt-2">
            <button 
              onClick={() => {
                resetFilters();
                setStipendValue(0);
                setCityChecked(false);
                setWfhChecked(false);
                setPartTimeChecked(false);
                setJobOfferChecked(false);
                setFastResponseChecked(false);
                setEarlyApplicantChecked(false);
                setWomenChecked(false);
                setKeyword('');
              }}
              className="text-sm font-medium text-[#008bdc] hover:underline"
            >
              Clear all
            </button>
          </div>

          <div className="border-t border-gray-200 my-2"></div>

          {/* Section h: Keyword Search */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Keyword Search</label>
            <div className="flex">
              <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Design, Mumbai, Infosys" 
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#008bdc] placeholder-gray-400 text-gray-900 border-r-0" 
              />
              <button 
                className="bg-[#008bdc] text-white px-3 py-2 rounded-r-md hover:bg-blue-700 flex items-center justify-center"
                onClick={() => setFilter('searchQuery', keyword)}
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
