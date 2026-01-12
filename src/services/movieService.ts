import type { Movie } from "../types/movie";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<FetchMoviesResponse> => {
  const response = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page,
        language: "en-US",
        include_adult: false,
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return response.data;
};
