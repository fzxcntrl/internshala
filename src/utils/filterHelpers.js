export function applyFilters(internships, filters) {
  if (!internships || !Array.isArray(internships)) return [];
  
  return internships.filter(internship => {
    // 1. Profile filter
    if (filters.profile) {
      const title = (internship.title || '').toLowerCase();
      if (!title.includes(filters.profile.toLowerCase())) {
        return false;
      }
    }

    // 2. Location filter
    if (filters.location) {
      const locFilter = filters.location.toLowerCase();
      const isRemoteFilter = locFilter === 'remote' || locFilter === 'work from home';
      
      const locations = Array.isArray(internship.locations) ? internship.locations : [];
      const locationMatch = locations.some(loc => 
        (loc || '').toLowerCase().includes(locFilter)
      );

      // If location string matches any of the locations OR if searching for remote and internship is remote
      if (!locationMatch && !(isRemoteFilter && internship.isRemote)) {
        return false;
      }
    }

    // 3. Duration filter
    if (filters.duration) {
      const durationStr = (internship.duration || '').toLowerCase();
      let durationInMonths = 0;
      
      const numMatch = durationStr.match(/(\d+)/);
      const val = numMatch ? parseInt(numMatch[1], 10) : 0;
      
      if (durationStr.includes('week')) {
        durationInMonths = val / 4; // approximate weeks to months
      } else if (durationStr.includes('month')) {
        durationInMonths = val;
      }

      let inRange = false;
      if (filters.duration === '1-3' && durationInMonths >= 1 && durationInMonths <= 3) inRange = true;
      else if (filters.duration === '3-6' && durationInMonths > 3 && durationInMonths <= 6) inRange = true;
      else if (filters.duration === '6+' && durationInMonths >= 6) inRange = true;
      
      if (!inRange) {
        return false;
      }
    }

    // 4. Minimum Stipend filter
    if (filters.minStipend > 0) {
      const stipendStr = (internship.stipend || '').toLowerCase();
      let stipendVal = 0;
      
      if (!stipendStr.includes('unpaid')) {
        // Remove commas from strings like "5,000" and extract the first number found
        const cleanStr = stipendStr.replace(/,/g, '');
        const match = cleanStr.match(/(\d+)/);
        stipendVal = match ? parseInt(match[1], 10) : 0;
      }
      
      if (stipendVal < filters.minStipend) {
        return false;
      }
    }

    return true;
  });
}

export function smartSearch(internships, query) {
  if (!query || !query.trim()) return internships;

  const q = query.toLowerCase().trim();
  const searchTerms = q.split(/\s+/); // support multi-word searching

  const scored = internships.map(internship => {
    let score = 0;
    const title = (internship.title || '').toLowerCase();
    const company = (internship.companyName || '').toLowerCase();
    const locations = Array.isArray(internship.locations) ? internship.locations.join(' ').toLowerCase() : '';
    const isRemoteStr = internship.isRemote ? 'remote work from home' : '';
    const duration = (internship.duration || '').toLowerCase();
    
    // Exact full matches are prioritized heavily
    if (title.includes(q)) score += 15;
    if (company.includes(q)) score += 15;
    
    // Partial word matches
    searchTerms.forEach(term => {
      if (title.includes(term)) score += 5;
      if (company.includes(term)) score += 5;
      if (locations.includes(term)) score += 3;
      if (isRemoteStr.includes(term)) score += 3;
      if (duration.includes(term)) score += 1;
    });

    return { internship, score };
  });

  // Filter out those with 0 score, sort by highest score, map back to internships
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.internship);
}

export function sortInternships(internships, sortBy) {
  if (sortBy === 'relevance') return internships;

  return [...internships].sort((a, b) => {
    if (sortBy === 'stipend') {
      const getStipend = (str) => {
        if (!str || str.toLowerCase().includes('unpaid')) return 0;
        const m = str.replace(/,/g, '').match(/(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
      };
      return getStipend(b.stipend) - getStipend(a.stipend);
    }
    if (sortBy === 'newest') {
      return b.id - a.id; 
    }
    return 0;
  });
}
