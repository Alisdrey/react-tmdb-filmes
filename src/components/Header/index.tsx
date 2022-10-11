import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';

import Logo from '../../assets/logo.png';
import IconSearchLittle from '../../assets/search-little.svg';
import IconSearch from '../../assets/icon-search.svg';
import IconClose from '../../assets/Icon/icon-close.svg';

import { Visibility } from '../Visibility';

import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { getSearchMovie } from '../../services/movie.service';
import { ErrorProps, MovieProps } from '../../models/Movie';

import styles from './styles.module.scss';

export const Header: React.FC = () => {

    const navigate = useNavigate();

    const [realTimeValue, setRealTimeValue] = useState('');
    const [error, setError] = useState<ErrorProps>({
        isError: false,
        message: ""
    });
    const [listMovie, setListMovie] = useState<MovieProps[]>();
    const [activeSearch, setActiveSearch] = useState<boolean>(false);

    const debouncedValue = useDebouncedValue(realTimeValue, 500);

    useEffect(() => {
        if (debouncedValue === "") {
            setListMovie([]);
            return;
        }

        getSearchMovie(1, debouncedValue)
            .then((response: AxiosResponse) => {
                if (response.status === 200)
                    setListMovie(response.data.results);
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 429) {
                    setError({
                        isError: true,
                        message: "Limite de solicitações excedido. tente novamente em alguns segundos."
                    });
                }
            });
    }, [debouncedValue]);

    const handleSearchMovie = (e: ChangeEvent<HTMLInputElement>) => {
        setRealTimeValue(e.target.value);
    };

    const handleDetailsMovie = (id: number) => {
        setListMovie([]);
        navigate(`/details/${id}`);
    };

    const handleActiveSearch = () => {
        setListMovie([]);
        setActiveSearch(!activeSearch);
    };

    const defineSearchIcon = () => {
        if (!activeSearch)
            return IconSearch;

        return IconClose;
    };

    return (
        <>
            <header className={styles.container}>
                <Link to={'/'}>
                    <img
                        src={Logo}
                        className={styles.iconLogo}
                        alt="Logo The Movie Database"
                    />
                </Link>
                <img
                    src={defineSearchIcon()}
                    alt="Imagem de uma Lupa"
                    className={styles.iconSearch}
                    onClick={() => handleActiveSearch()}
                />
            </header>

            <Visibility visible={activeSearch}>
                <div className={styles.contentDropSearch}>

                    <Visibility visible={error?.isError}>
                        <span>{error.message}</span>
                    </Visibility>

                    <Visibility visible={!error?.isError}>
                        <div className={styles.inputSearch}>
                            <input placeholder="Pesquisar" onChange={handleSearchMovie} />
                        </div>

                        <Visibility visible={!!(listMovie && listMovie?.length > 0)}>
                            <ul>
                                {listMovie?.map((list: MovieProps) => (
                                    <li key={list.id}>
                                        <div
                                            className={styles.rowSearch}
                                            onClick={() => handleDetailsMovie(list.id)}
                                        >
                                            <div className={styles.contentIcon}>
                                                <img src={IconSearchLittle} alt="Lupa para pesquisa" />
                                            </div>
                                            {list.title}
                                        </div>
                                    </li>
                                ))}
                            </ul >
                        </Visibility>
                    </Visibility >
                </div >
            </Visibility >
        </>
    );
};