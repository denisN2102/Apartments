import React, { useState, useEffect } from "react";
import bethroom from '../../assets/icons/bathroom.png';
import bed from '../../assets/icons/furniture.png';
import sqft from '../../assets/icons/selection.png';
import placeholder from '../../assets/icons/placeholder.png'
import heart from '../../assets/icons/heart.png';
import heartFilled from '../../assets/icons/heart-filled.png';

export const ApartmentCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(project._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [project._id]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (project.images?.length || 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (project.images?.length || 1) - 1 : prev - 1
    );
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(id => id !== project._id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(project._id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="project-card">
      {project.images && project.images.length > 0 ? (
        <div className="image-container">
          <img
            src={project.images[currentImageIndex]?.original}
            alt="Project"
            className="project-image"
          />
          <div className="image-buttons">
            <div className="new-building-button">New Building</div>
            <button className="add-to-favorites-button" onClick={toggleFavorite}>
              <span className="heart-icon">
                <img className="icon-heart" src={isFavorite ? heartFilled : heart} alt="favorite" />
              </span>
            </button>
          </div>
          <button onClick={handlePrevImage} className="image-button left">{"<"}</button>
          <button onClick={handleNextImage} className="image-button right">{">"}</button>
        </div>
      ) : (
        <p>No images available</p>
      )}
      <div className="project-info">
        <h3 className="project-name">{project.generalInfo?.name || "No name available"}</h3>
        <p className="project-price">
          {project.generalInfo?.price
            ? `$${new Intl.NumberFormat('en-US').format(project.generalInfo.price)}`
            : "Not available"}
        </p>
      </div>
      <div className="project-address">
        <img src={placeholder} className="icon" alt="location" />
        <p className="address">{`${project.generalInfo?.province}` || "Not specified"}</p>
      </div>
      <div className="project-details">
        <span className="detail-item">
          <img src={bethroom} className="icon" alt="bathroom" />
          <p className="detail-text">{project.generalInfo?.bathrooms || "Not specified"} <span>Beds</span></p>
        </span>
        <span className="detail-item">
          <img src={bed} className="icon" alt="bed" />
          <p className="detail-text">{project.generalInfo?.rooms || "Not specified"} <span>Baths</span></p>
        </span>
        <span className="detail-item">
          <img src={sqft} className="icon" alt="size" />
          <p className="detail-text">{project.generalInfo?.size || "Not specified"} <span>sqft</span></p>
        </span>
      </div>
    </div>
  );
};
