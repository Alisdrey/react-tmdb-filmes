import { useEffect, useRef, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

import { FeatureMovie } from '../../components/FeatureMovie';
import { MovieCards } from '../../components/MovieCards';
import { Pagination } from '../../components/Pagination';

import { MovieProps } from '../../models/Movie';
import { getMoviePopular } from '../../services/movie.service';

import styles from './styles.module.scss';
import { convertDate } from '../../utils/ConvertDate';

export function Home() {

    const listScroll = useRef(null);
    const scrollToRefObject = (ref: any) => window.scrollTo(300, ref.current?.offsetTop);

    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);

    const [listMoviePopular, setListMoviePopular] = useState<MovieProps[]>([]);

    useEffect(() => {
        loadMovies();
    }, [currentPage]);

    const loadMovies = () => {
        if (currentPage > 1)
            scrollToRefObject(listScroll);

        setLoading(true);

        getMoviePopular(currentPage)
            .then((response: AxiosResponse) => {
                if (response.status == 200) {

                    response.data.results.map((item: MovieProps) => {
                        item.release_date = convertDate(item.release_date);
                    });

                    setListMoviePopular(response.data.results);
                    setTotalResults(response.data.total_results);
                }
            })
            .catch((error: AxiosError) => {
                console.log(JSON.stringify(error));
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
    };

    return (
        <>
            <FeatureMovie />

            <section className={styles.section} ref={listScroll}>
                <h2>Os Mais Populares</h2>

                <MovieCards listMovie={listMoviePopular} loading={loading} />

                <Pagination
                    totalCountOfRegisters={totalResults}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </section>
        </>
    );
}