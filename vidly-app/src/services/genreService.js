import http from "./httpService";

export function getGenres() {
  return http.get(`${import.meta.env.REACT_APP_API_URL}/genres`);
}
