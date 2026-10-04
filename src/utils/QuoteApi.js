const BASE_URL = "https://stoic.fyi/api/quotes";

export const getStoicQuotes = () => {
  return fetch(BASE_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};