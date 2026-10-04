import { BASE_URL, HEADERS } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getExercises = (target) => {
  return fetch(`${BASE_URL}?muscle=${encodeURIComponent(target)}`, {
    headers: HEADERS,
  }).then(checkResponse);
};