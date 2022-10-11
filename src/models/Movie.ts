export interface MovieProps {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface MovieDetails {
  id: number;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  runtime: string;
  genres: string;
  tagline: string;
}

export interface ErrorProps {
  isError: boolean;
  message: string;
}