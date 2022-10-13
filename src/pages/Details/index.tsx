import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { MovieDetails } from '../../models/Movie';

import { getMovieDetails } from '../../services/movie.service';
import { Visibility } from '../../components/Visibility';

import { convertRuntime } from '../../utils/ConvertRunTime';
import { concatGenres } from '../../utils/ConcatGenres';
import { convertDate } from '../../utils/ConvertDate';
import { colorRating } from '../../utils/ColorRating';
import { GetPoster } from '../../utils/Cover';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import styles from './styles.module.scss';

export const Details: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<MovieDetails>();

    useEffect(() => {
        if (id === undefined)
            navigate("/");
    }, []);

    useEffect(() => {
        getDetails();
    }, [id]);

    const getDetails = () => {
        setLoading(true);
        getMovieDetails(id)
            .then((response) => {
                if (response.status === 200) {
                    response.data.genres = concatGenres(response.data.genres.slice(0, 3));
                    response.data.runtime = convertRuntime(response.data.runtime);
                    response.data.release_date = convertDate(response.data.release_date);
                    response.data.vote_average_percentage = `${Math.floor(response.data.vote_average * 10)}%`;

                    setDetails(response.data);
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
            .finally(() => {
                window.scrollTo(0, 0);
                setLoading(false);
            });
    };

    const backgroundPage = `linear-gradient(to right, rgba(6.27%, 5.49%, 5.49%, 1.00) 150px, rgba(6.27%, 5.49%, 5.49%, 0.84) 100%), url(
        ${GetPoster("original", details?.backdrop_path!)})`;

    return (
        <>
            <Visibility visible={loading}>
                <div data-testid="loading-id">
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton height={800} />
                    </SkeletonTheme>
                </div>
            </Visibility>

            <Visibility visible={!loading}>
                <section className={styles.section} style={{ backgroundImage: backgroundPage }}>
                    <div className={styles.container}>
                        <div className={styles.content}>

                            <img src={GetPoster("w500", details?.poster_path!)} width={200} />

                            <div className={styles.information}>
                                <h1 className={styles.title}>{details?.title}</h1>

                                <div className={styles.facts}>
                                    <p>{details?.release_date}</p>
                                    <p>{details?.genres}</p>
                                    <p>{details?.runtime}</p>
                                </div>

                                <div className={styles.contentRating}>
                                    <span
                                        className={styles.circularProgressbar}
                                        style={{
                                            border: `0.188rem dashed ${colorRating(details?.vote_average)}`
                                        }}
                                    >
                                        {details?.vote_average_percentage}
                                    </span>
                                    Avaliação dos usuários
                                </div>

                                <p className={styles.tagLine}>
                                    {details?.tagline}
                                </p>

                            </div>
                        </div>

                        <div className={styles.contentSinopse}>
                            <p className={styles.sinopseText}>Sinopse</p>
                            <p className={styles.description}>
                                {details?.overview}
                            </p>
                        </div>
                    </div>
                </section>
            </Visibility>
        </>
    );
};