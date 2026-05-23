import { useState, useCallback } from 'react';
import { applyFilters as applyFiltersUtil, smartSearch } from '../utils/filterHelpers';

const initialFilters = {
  profile: "",
  location: "",
  duration: "",
  minStipend: 0,
  searchQuery: ""
};

export function useFilters() {
  const [filters, setFilters] = useState(initialFilters);

  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const applyFilters = useCallback((internships) => {
    let result = applyFiltersUtil(internships, filters);
    
    if (filters.searchQuery) {
      result = smartSearch(result, filters.searchQuery);
    }
    
    return result;
  }, [filters]);

  return { filters, setFilter, resetFilters, applyFilters };
}
