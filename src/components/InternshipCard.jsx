import { useState, useMemo } from 'react';
import {
  HomeModernIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  BookmarkIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

export default function InternshipCard({ internship, className = "", style = {}, isBookmarked, onToggleBookmark }) {
  const [toastMsg, setToastMsg] = useState('');

  // Simulating random flags as requested
  const showActivelyHiring = useMemo(() => Math.random() < 0.4, []);
  const showJobOffer = useMemo(() => Math.random() < 0.3, []);
  const showEarlyApplicant = useMemo(() => Math.random() < 0.2, []);

  // Time logic for "Today", "Just now", "X days ago"
  const relativeTime = useMemo(() => {
    const r = Math.random();
    if (r < 0.2) return { text: 'Just now', color: 'text-green-600' };
    if (r < 0.4) return { text: 'Today', color: 'text-green-600' };
    const days = Math.floor(Math.random() * 10) + 1;
    return { text: `${days} days ago`, color: 'text-gray-400' };
  }, []);

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
    logoUrl,
    description,
    skills = []
  } = internship;

  const locationText = locations.length > 0 ? locations.join(', ') : (isRemote ? 'Work from home' : 'Not specified');
  
  // Format stipend to match screenshot style: e.g. "₹ 15,000 - 25,000 /month"
  let formattedStipend = stipend;
  if (formattedStipend && !formattedStipend.includes('₹') && !formattedStipend.includes('/')) {
    formattedStipend = `₹ ${formattedStipend} /month`;
  } else if (!formattedStipend) {
    formattedStipend = 'Unpaid';
  }

  const formattedDuration = duration ? (duration.toLowerCase().includes('month') ? duration : `${duration} Months`) : 'Not specified';

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
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow transition-shadow duration-200 flex flex-col gap-3 relative ${className}`}
      style={style}
    >
      <button 
        onClick={handleBookmarkClick}
        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-50 transition-colors z-10"
        aria-label="Toggle Bookmark"
      >
        {isBookmarked ? (
          <BookmarkSolidIcon className="h-6 w-6 text-[#008bdc] transition-colors duration-200" />
        ) : (
          <BookmarkIcon className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
        )}
      </button>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-xl animate-fade-in whitespace-nowrap">
          {toastMsg}
        </div>
      )}

      {/* TOP SECTION & TITLE ROW */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col gap-1 pr-12">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-[15px]">{companyName || 'Company Name'}</h3>
            {showActivelyHiring && (
              <span className="bg-green-50 text-green-600 text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                Actively hiring
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 leading-tight mt-1">
            {title || 'Internship Title'}
          </h2>
        </div>
        
        {/* LOGO ON THE RIGHT */}
        <div className="h-[60px] w-[60px] rounded-lg border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden ml-2">
          {logoUrl ? (
            <img src={logoUrl} alt={`${companyName} logo`} className="w-full h-full object-contain bg-white" />
          ) : (
            <span className="text-xl font-bold text-[#008bdc]">{companyName ? companyName.charAt(0).toUpperCase() : 'C'}</span>
          )}
        </div>
      </div>

      {/* INFO ROW */}
      <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600 mt-2">
        <div className="flex items-center gap-1.5">
          <HomeModernIcon className="h-4 w-4 text-gray-400" />
          <span>{locationText}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CurrencyRupeeIcon className="h-4 w-4 text-gray-400" />
          <span>{formattedStipend}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
          <span>{formattedDuration}</span>
        </div>
      </div>

      {/* DESCRIPTION LINE */}
      {description && (
        <div className="text-sm text-gray-500 mt-1 line-clamp-1">
          {description}
        </div>
      )}

      {/* SKILLS/TAGS ROW */}
      {skills && skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.slice(0, 4).map((skill, i) => (
            <span key={i} className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-full">
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-full">
              +{skills.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* FOOTER ROW */}
      <div className="flex flex-wrap justify-between items-center border-t border-gray-100 mt-3 pt-3 gap-y-2">
        {/* Left */}
        <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded text-xs font-medium">
          <ClockIcon className={`h-3.5 w-3.5 ${relativeTime.color}`} />
          <span className={relativeTime.color}>{relativeTime.text}</span>
        </div>
        
        {/* Middle */}
        {showJobOffer && (
          <div className="hidden sm:flex items-center">
             <span className="bg-amber-50 text-amber-600 text-[11px] font-medium px-2 py-0.5 rounded-full">
               Job offer upto ₹ 5LPA post internship
             </span>
          </div>
        )}

        {/* Right */}
        <div className="flex flex-wrap items-center gap-2">
          {showEarlyApplicant && (
            <span className="bg-green-50 text-green-600 text-[11px] font-medium px-2 py-0.5 rounded-full">
              Be an early applicant
            </span>
          )}
          {isPartTime && (
            <span className="bg-gray-100 text-gray-600 text-[11px] font-medium px-2 py-0.5 rounded-full">
              Part time
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
