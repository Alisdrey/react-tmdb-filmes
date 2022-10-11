import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { MovieDetails } from '../../models/Movie';

import { getMovieDetails } from '../../services/movie.service';

import { convertRuntime } from '../../utils/ConvertRunTime';
import { GetPoster } from '../../utils/Cover';
import { concatGenres } from '../../utils/ConcatGenres';

import styles from './styles.module.scss';
import { convertDate } from '../../utils/ConvertDate';
import { Visibility } from '../../components/Visibility';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

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
                    response.data.vote_average = `${Math.floor(response.data.vote_average * 10)}%`;

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
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton height={800} />
                </SkeletonTheme>
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
                                    <span className={styles.circularProgressbar}>
                                        {details?.vote_average}
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