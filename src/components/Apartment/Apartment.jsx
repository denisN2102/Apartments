import React, { useEffect, useState } from "react";
import { ApartmentCard } from "../ApartmentCard/ApartmentCard";
import useFetch from "../hooks/FetchHook";
import Pagination from "../Pagination/Pagination";
import "./Apartment.css";

export const Apartment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const { projects, totalPages, loading, error } = useFetch(currentPage, pageSize);

  const handleResize = () => {
    if (window.innerWidth <= 628) setPageSize(1);
    else if (window.innerWidth <= 809) setPageSize(2);
    else setPageSize(3);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="container">
      <h1 className="title">Article</h1>
      <div className="grid">
        {projects.map((project, index) => (
          <ApartmentCard key={index} project={project} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};
