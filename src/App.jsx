import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import InternshipCard from './components/InternshipCard';
import { useInternships } from './hooks/useInternships';
import { useFilters } from './hooks/useFilters';
import { useBookmarks } from './hooks/useBookmarks';
import { sortInternships } from './utils/filterHelpers';
import { useState, useEffect } from 'react';

export default function App() {
  const { internships, loading, error } = useInternships();
  const { filters, setFilter, resetFilters, applyFilters } = useFilters();
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  
  const [sortBy, setSortBy] = useState('relevance');
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const baseFiltered = applyFilters(internships);
  let filteredInternships = sortInternships(baseFiltered, sortBy);

  if (activeTab === 'saved') {
    filteredInternships = filteredInternships.filter(internship => isBookmarked(internship.id));
  }
  const skeletons = Array(6).fill(null);

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-gray-900 font-sans flex flex-col">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col flex-1">
        
        {/* Centered Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {filteredInternships.length} Total Internships
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Latest Summer Internships</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Column: Filter Panel */}
          <aside className="w-full lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24">
            <FilterPanel filters={filters} setFilter={setFilter} resetFilters={resetFilters} />
          </aside>
          
          {/* Right Column: Results List */}
          <div className="flex-1 w-full">
            {loading ? (
              /* Loading State: Skeletons */
              <div className="flex flex-col gap-4">
                {skeletons.map((_, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 h-[200px]">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-2">
                        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              /* Error State */
              <div className="bg-red-50 p-12 rounded-xl border border-red-100 text-center flex flex-col items-center justify-center shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
                <p className="text-red-600 mb-6 font-medium max-w-md">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-lg font-semibold transition-colors shadow-sm"
                >
                  Try Again
                </button>
              </div>
            ) : (
              /* Results State */
              <>
                <div className="mb-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  
                  <div className="flex bg-gray-200/50 p-1 rounded-lg w-full sm:w-auto">
                    <button 
                      onClick={() => setActiveTab('all')}
                      className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-[14px] font-bold transition-all ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      All Internships
                    </button>
                    <button 
                      onClick={() => setActiveTab('saved')}
                      className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-[14px] font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'saved' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Saved <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeTab === 'saved' ? 'bg-[#008bdc] text-white' : 'bg-gray-300 text-gray-700'}`}>{bookmarks.length}</span>
                    </button>
                  </div>

                  <div className="flex items-center w-full sm:w-auto justify-end">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white border border-gray-200 text-gray-700 py-1.5 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium cursor-pointer transition-shadow shadow-sm hover:shadow"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="newest">Newest First</option>
                      <option value="stipend">Highest Stipend</option>
                    </select>
                  </div>
                </div>

                {activeTab === 'saved' && filteredInternships.length === 0 ? (
                  /* Empty Saved State */
                  <div className="bg-white p-16 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center animate-fade-in">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-[#008bdc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No saved internships yet</h3>
                    <p className="text-gray-500 mb-8 max-w-md text-[15px]">
                      Click the bookmark icon on any card to save it for later.
                    </p>
                    <button 
                      onClick={() => setActiveTab('all')}
                      className="bg-[#008bdc] hover:bg-[#0073b8] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm"
                    >
                      Browse Internships
                    </button>
                  </div>
                ) : filteredInternships.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {filteredInternships.map((internship, index) => (
                      <InternshipCard 
                        key={internship.id}
                        internship={internship}
                        className="animate-slide-up relative"
                        style={{ animationDelay: `${Math.min(index, 8) * 75}ms` }}
                        isBookmarked={isBookmarked(internship.id)}
                        onToggleBookmark={toggleBookmark}
                      />
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="bg-white p-16 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 text-[#008bdc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10h.01M14 10h.01" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No internships found</h3>
                    <p className="text-gray-500 mb-8 max-w-md text-[15px]">
                      We couldn't find any internships matching your current filters. Try adjusting your search criteria or clear your filters to see more results.
                    </p>
                    <button 
                      onClick={resetFilters}
                      className="bg-[#008bdc] hover:bg-[#0073b8] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#008bdc] text-white p-4 rounded-full shadow-lg hover:bg-[#0073b8] hover:shadow-xl transition-all z-50 animate-slide-up focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Back to Top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
      )}
    </div>
  );
}
