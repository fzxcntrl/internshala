export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer text-[#008bdc]">
            <svg className="w-8 h-8 mr-2" viewBox="89.75 -4.25 24 24" fill="currentColor">
              <path d="M91.1885 5.48222L96.1378 9.29731L96.1213 14.5188L100.143 11.873L104.007 14.6013L112.686 1L91.1885 5.48222ZM98.4609 10.5594L97.0513 12.9309L97.0575 8.93951L109.964 2.72504L98.4609 10.5594Z" />
            </svg>
            <span className="text-[22px] font-bold tracking-tight">internshala</span>
          </div>
          
          {/* Nav Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-8 items-center ml-10">
            <a href="#" className="text-gray-700 hover:text-[#008bdc] font-medium text-[15px] transition-colors">Internships</a>
            <a href="#" className="text-gray-700 hover:text-[#008bdc] font-medium text-[15px] transition-colors">Jobs</a>
            <a href="#" className="text-gray-700 hover:text-[#008bdc] font-medium text-[15px] transition-colors">Courses</a>
            <a href="#" className="text-gray-700 hover:text-[#008bdc] font-medium text-[15px] transition-colors">More</a>
          </div>
          
          {/* Buttons Section */}
          <div className="flex items-center space-x-3 ml-auto md:ml-0">
            <button className="text-[#008bdc] border border-[#008bdc] hover:bg-blue-50 bg-white px-5 py-2 rounded-[4px] font-semibold text-sm transition-colors">
              Login
            </button>
            <button className="bg-[#008bdc] hover:bg-[#0073b8] text-white px-5 py-2 rounded-[4px] font-semibold text-sm transition-colors">
              Register
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
