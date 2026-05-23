import { useState, useEffect } from 'react';
import axios from 'axios';

export function useInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get('https://internshala.com/hiring/search');
        
        const { internships_meta, internship_ids } = response.data;
        
        // Handle potentially missing data safely
        if (!internships_meta || !internship_ids) {
          throw new Error('Invalid response format received from API');
        }

        const parsedInternships = internship_ids.map(id => {
          const internship = internships_meta[id];
          
          return {
            id: internship.id,
            title: internship.title,
            companyName: internship.company_name,
            locations: internship.location_names || [],
            stipend: internship.stipend?.salary || '',
            duration: internship.duration || '',
            isRemote: !!internship.work_from_home,
            isPartTime: !!internship.part_time,
            startDate: internship.start_date || '',
            deadline: internship.application_deadline || '',
            logoUrl: internship.logo ? `https://internshala.com${internship.logo}` : ''
          };
        });

        setInternships(parsedInternships);
      } catch (err) {
        setError(err.message || 'Failed to fetch internships');
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return { internships, loading, error };
}
