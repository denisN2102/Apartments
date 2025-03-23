import { useState, useEffect } from "react";

const useFetch = (page, pageSize) => {
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
            `https://crm.server.pro-part.es/api/v1/secondary-projects/integration/projects?accessKey=A7gjfjj0WdBynt8d&secretKey=tGH5UlZcgNtAPrfq9MnmMhWji9j5vYXn&isPagination=true&size=${pageSize}&page=${page}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              
            }),
          }
        );

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setProjects(data.projects || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, pageSize]);

  return { projects, totalPages, loading, error };
};

export default useFetch;
