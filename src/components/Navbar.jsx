export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer text-[#006BFF]">
            <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18C5 17.18 8 20 12 20C16 20 19 17.18 19 17.18V13.18L12 17L5 13.18Z" />
            </svg>
            <span className="text-[22px] font-bold tracking-tight">internshala</span>
          </div>
          
          {/* Nav Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-8 items-center ml-10">
            <a href="#" className="text-gray-700 hover:text-[#006BFF] font-medium text-[15px] transition-colors">Internships</a>
            <a href="#" className="text-gray-700 hover:text-[#006BFF] font-medium text-[15px] transition-colors">Jobs</a>
            <a href="#" className="text-gray-700 hover:text-[#006BFF] font-medium text-[15px] transition-colors">Courses</a>
            <a href="#" className="text-gray-700 hover:text-[#006BFF] font-medium text-[15px] transition-colors">More</a>
          </div>
          
          {/* Buttons Section */}
          <div className="flex items-center space-x-3 ml-auto md:ml-0">
            <button className="text-[#006BFF] border border-[#006BFF] hover:bg-blue-50 bg-white px-5 py-2 rounded-[4px] font-semibold text-sm transition-colors">
              Login
            </button>
            <button className="bg-[#006BFF] hover:bg-[#005AE0] text-white px-5 py-2 rounded-[4px] font-semibold text-sm transition-colors">
              Register
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
