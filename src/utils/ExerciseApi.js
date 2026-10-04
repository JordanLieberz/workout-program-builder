const BASE_URL = "https://api.api-ninjas.com/v1/exercises";
const API_KEY = "B6w3cDVxAZxes44UXoPsxqxYqW3huUpBTU7gdEdz"; 

export const getExercises = (muscleOrGoal) => {
  return fetch(`${BASE_URL}?muscle=${encodeURIComponent(muscleOrGoal)}`, {
    headers: {
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};