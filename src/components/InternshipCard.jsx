import { useState } from 'react';
import {
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  BookmarkIcon,
  HomeModernIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

export default function InternshipCard({ internship, className = "", style = {}, isBookmarked, onToggleBookmark }) {
  const [toastMsg, setToastMsg] = useState('');

  if (!internship) return null;

  const { 
    id, 
    title, 
    companyName, 
    locations = [], 
    stipend, 
    duration, 
    isRemote, 
    isPartTime, 
    startDate, 
    deadline, 
    logoUrl 
  } = internship;

  const locationText = locations.length > 0 ? locations.join(', ') : (isRemote ? 'Work From Home' : 'Not specified');

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    if (onToggleBookmark) onToggleBookmark(id);
    const msg = isBookmarked ? "Removed from saved" : "Saved!";
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 1500);
  };

  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 relative flex flex-col gap-3 ${className}`}
      style={style}
    >
      {/* 1. CARD HEADER ROW */}
      <div className="flex items-center gap-3 pr-8">
        <div className="h-12 w-12 rounded-lg bg-gray-100 border border-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt={`${companyName} logo`} className="w-full h-full object-contain bg-white" />
          ) : (
            <span className="text-xl font-bold text-[#006BFF]">{companyName ? companyName.charAt(0).toUpperCase() : 'C'}</span>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-base text-gray-900 leading-tight">
            {title || 'Internship Title'}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{companyName || 'Company Name'}</p>
        </div>
      </div>

      <button 
        onClick={handleBookmarkClick}
        className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-50 transition-colors z-10"
        aria-label="Toggle Bookmark"
      >
        {isBookmarked ? (
          <BookmarkSolidIcon className="h-5 w-5 text-[#006BFF] transition-colors duration-200" />
        ) : (
          <BookmarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
        )}
      </button>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-xl animate-fade-in whitespace-nowrap">
          {toastMsg}
        </div>
      )}

      {/* 2. TAGS ROW */}
      {(isRemote || isPartTime) && (
        <div className="flex flex-wrap gap-2 mt-1">
          {isRemote && (
            <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full flex items-center">
              <HomeModernIcon className="h-3.5 w-3.5 mr-1 inline" />
              Work From Home
            </span>
          )}
          {isPartTime && (
            <span className="bg-orange-50 text-orange-600 text-xs px-2 py-0.5 rounded-full flex items-center">
              Part Time
            </span>
          )}
        </div>
      )}

      {/* 3. INFO GRID */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-3">
        {/* Cell 1: Location */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Location</span>
          </div>
          <span className="text-sm text-gray-700 font-medium">{locationText}</span>
        </div>

        {/* Cell 2: Start Date */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Start Date</span>
          </div>
          <span className="text-sm text-gray-700 font-medium">{startDate || 'Immediately'}</span>
        </div>

        {/* Cell 3: Duration */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Duration</span>
          </div>
          <span className="text-sm text-gray-700 font-medium">{duration || 'Not specified'}</span>
        </div>

        {/* Cell 4: Stipend */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <CurrencyRupeeIcon className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Stipend</span>
          </div>
          <span className="text-sm text-gray-700 font-medium">{stipend || 'Unpaid'}</span>
        </div>
      </div>

      {/* 4. CARD FOOTER */}
      <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-3">
        <div className="flex items-center gap-1">
          <ClockIcon className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-xs text-gray-400">Apply by {deadline || 'N/A'}</span>
        </div>
        <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
}
