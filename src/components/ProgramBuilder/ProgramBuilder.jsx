import React, { useState } from "react";
import { getExercises } from "../../utils/api";
import Preloader from "../Preloader/Preloader";
import ExerciseGrid from "../ExerciseGrid/ExerciseGrid";
import "./ProgramBuilder.css";

function ProgramBuilder() {
  const [goal, setGoal] = useState("");
  const [days, setDays] = useState("3");
  const [focus, setFocus] = useState("Full body");

  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const musclePools = {
    "Upper / Lower": [
      ["chest", "lats", "biceps"],
      ["chest", "middle_back", "triceps"],
      ["quadriceps", "hamstrings", "calves"],
      ["quadriceps", "glutes", "hamstrings"],
    ],
    "Push / Pull / Legs": [
      ["chest", "triceps", "shoulders"],
      ["lats", "biceps", "middle_back"],
      ["quadriceps", "hamstrings", "glutes"],
    ],
    "Full body": [
      ["chest", "lats", "quadriceps"],
      ["shoulders", "middle_back", "hamstrings"],
      ["biceps", "triceps", "quadriceps"],
    ],
  };

  const getRandomTargets = (focusSelection) => {
    const pools = musclePools[focusSelection] || musclePools["Full body"];
    const randomIndex = Math.floor(Math.random() * pools.length);
    return pools[randomIndex];
  };

  const shuffleArray = (array) => {
    return array.sort(() => 0.5 - Math.random());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setHasSearched(true);

    const targetMuscles = getRandomTargets(focus);

    Promise.all(targetMuscles.map((muscle) => getExercises(muscle)))
      .then((results) => {
        const combined = results.flat();
        const uniqueExercises = Array.from(
          new Map(combined.map((item) => [item.name, item])).values()
        );

        setExercises(shuffleArray(uniqueExercises));
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="builder">
      <form className="builder__form" onSubmit={handleSubmit}>
        <div className="builder__step">
          <div className="builder__step-header">
            <span className="builder__step-number">1</span>
            <label className="builder__label" htmlFor="goal-select">
              Set Your Goal
            </label>
          </div>
          <select
            id="goal-select"
            className="builder__select"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="" disabled>
              Select your goal
            </option>
            <option value="hypertrophy">Build Muscle (Hypertrophy)</option>
            <option value="strength">Increase Strength</option>
            <option value="endurance">Muscular Endurance</option>
          </select>
        </div>

        <div className="builder__step">
          <div className="builder__step-header">
            <span className="builder__step-number">2</span>
            <span className="builder__label">Choose Your Schedule</span>
          </div>
          <div className="builder__days-options">
            {["3", "4", "5", "6"].map((numDays) => (
              <button
                type="button"
                key={numDays}
                className={`builder__day-btn ${
                  days === numDays ? "builder__day-btn_active" : ""
                }`}
                onClick={() => setDays(numDays)}
              >
                {numDays} days/week
              </button>
            ))}
          </div>
        </div>

        <div className="builder__step">
          <div className="builder__step-header">
            <span className="builder__step-number">3</span>
            <label className="builder__label" htmlFor="focus-select">
              Select Your Focus
            </label>
          </div>
          <select
            id="focus-select"
            className="builder__select"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
          >
            <option value="Full body">Full body</option>
            <option value="Upper / Lower">Upper / Lower Split</option>
            <option value="Push / Pull / Legs">Push / Pull / Legs</option>
          </select>
        </div>

        <div className="builder__step">
          <div className="builder__step-header">
            <span className="builder__step-number">4</span>
            <span className="builder__label">Create Your Program</span>
          </div>
          <button type="submit" className="builder__submit-btn">
            Generate Program &rarr;
          </button>
        </div>
      </form>

      {isLoading && <Preloader />}

      {isError && (
        <p className="builder__message builder__message_error">
          Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.
        </p>
      )}

      {!isLoading && !isError && hasSearched && exercises.length === 0 && (
        <p className="builder__message builder__message_empty">Nothing found.</p>
      )}

      {!isLoading && !isError && exercises.length > 0 && (
        <ExerciseGrid exercises={exercises} />
      )}
    </section>
  );
}

export default ProgramBuilder;