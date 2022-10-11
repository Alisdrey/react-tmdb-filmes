import { Link } from 'react-router-dom';

import { GetPoster } from '../../utils/Cover';
import { LoadingCard } from '../LoadingCard';
import { Visibility } from '../Visibility';

import { MovieCardsProps } from './interface';

import styles from './styles.module.scss';

export const MovieCards: React.FC<MovieCardsProps> = (props) => {

    const { listMovie, loading } = props;

    const poster = (namePoster: string) => GetPoster("w500", namePoster);

    const redirectMovieDetails = (id: number) => {
        return `/details/${id}`;
    };

    return (
        <>
            <Visibility visible={loading}>
                <LoadingCard qtd={20} />
            </Visibility>

            <Visibility visible={!loading}>
                <div className={styles.container}>
                    {listMovie.map((movie) => (
                        <Link to={redirectMovieDetails(movie.id)} key={movie.id}>
                            <img src={poster(movie.poster_path)} />
                            <div className={styles.information}>
                                <p>{movie.title}</p>
                                <small>{movie.release_date}</small>
                            </div>
                        </Link>
                    ))}
                </div>
            </Visibility>
        </>
    );
};