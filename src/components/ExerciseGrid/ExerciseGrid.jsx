import React, { useState } from "react";
import "./ExerciseGrid.css";

function ExerciseGrid({ exercises }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <section className="exercise-grid">
      <div className="exercise-grid__cards">
        {exercises.slice(0, visibleCount).map((exercise, index) => (
          <div key={index} className="exercise-card">
            <h3 className="exercise-card__title">{exercise.name}</h3>
            <div className="exercise-card__tags">
              <span className="exercise-card__tag">{exercise.type}</span>
              <span className="exercise-card__tag">{exercise.muscle}</span>
              <span className="exercise-card__tag">{exercise.equipment}</span>
            </div>
            <p className="exercise-card__instructions">{exercise.instructions}</p>
          </div>
        ))}
      </div>

      {visibleCount < exercises.length && (
        <button type="button" className="exercise-grid__show-more" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </section>
  );
}

export default ExerciseGrid;