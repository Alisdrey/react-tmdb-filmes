import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Visibility } from '../Visibility';

import iconInfo from '../../assets/icon-info.svg';

import { getMovieTopRated } from '../../services/movie.service';
import { MovieProps } from '../../models/Movie';
import { GetPoster } from '../../utils/Cover';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './styles.module.scss';

export const FeatureMovie: React.FC = () => {

  const [movieTopRated, setMovieTopRated] = useState<MovieProps>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadMoviesTopRated();
  }, []);

  const loadMoviesTopRated = () => {
    setLoading(true);

    getMovieTopRated().then((response: AxiosResponse) => {
      if (response.status === 200)
        setMovieTopRated(response.data.results[0]);
    })
      .catch((error: AxiosError) => {
        console.log(JSON.stringify(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDetailsMovie = (id: number | undefined) => {
    if (!id) return;
    navigate(`/details/${id}`);
  };

  const backgroundPage = `linear-gradient(to right, rgba(6.27%, 5.49%, 5.49%, 1.00) 150px, rgba(6.27%, 5.49%, 5.49%, 0.84) 100%), url(
    ${GetPoster("original", movieTopRated?.backdrop_path!)})`;

  return (
    <>
      <Visibility visible={loading}>
        <div data-testid="loading-id">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={800} />
          </SkeletonTheme>
        </div>
      </Visibility>

      <Visibility visible={(!loading)}>
        <div
          className={styles.container}
          style={{ backgroundImage: backgroundPage }}
        >
          <div className={styles.content}>
            <h1>Top 1 no Brasil</h1>

            <p className={styles.title}>{movieTopRated?.title}</p>
            <p className={styles.description}>{movieTopRated?.overview}</p>

            <button
              onClick={() => handleDetailsMovie(movieTopRated?.id)}
              data-testid="btn-id"
            >
              <img src={iconInfo} alt="" /> Mais Informações
            </button>
          </div>
        </div >
      </Visibility>
    </>
  );
};