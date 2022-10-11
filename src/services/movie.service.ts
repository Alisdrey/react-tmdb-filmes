import { api } from "./api";

export const getMoviePopular = (currentPage: number) => {
  return Promise.resolve(api.get('/movie/popular', { params: { page: currentPage, language: 'pt-BR' } }));
};

export const getMovieDetails = (id = "") => {
  return Promise.resolve(api.get(`/movie/${id}`, { params: { language: 'pt-BR' } }));
};

export const getSearchMovie = (currentPage: number, search: string) => {
  return Promise.resolve(api.get('/search/movie', {
    params: {
      page: currentPage,
      query: search,
      language: 'pt-BR'
    },
  }));
};

export const getMovieTopRated = () => {
  return Promise.resolve(api.get('/movie/top_rated', { params: { language: 'pt-BR' } }));
};

