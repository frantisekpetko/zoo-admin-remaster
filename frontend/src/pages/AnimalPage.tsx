import React, { useState, useEffect } from 'react';
import Navigation from '../components/common/Navigation';
import styled from 'styled-components';
import { List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import io from 'socket.io-client';
import Footer from '../components/common/Footer';
import { useHistory } from 'react-router-dom';

import SearchField from 'react-search-field';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Box, CardMedia } from '@mui/material';
import { useStoreActions, useStoreState } from '../store';
import Content from '../components/common/Content';
import ContenLoader from 'src/components/ContentLoader';
import Head from "../components/Head";

library.add(fab, faChevronRight);

const Icon = styled(FontAwesomeIcon)`
    margin-left: 0.5rem;

    &:hover ${this} {
        color: black;
    }
`;

const DetailButton = styled(Button)`
    color: black;
`;

const FinalContainer = styled.div`
    width: 100%;
    opacity: 0.7;
    height: calc(100% - 115px);

    display: flex;
    content-align: flex-end;
    align-items: flex-end;
    align-content: flex-end;
`;

const InputContainer = styled.div`
    position: fixed;
    bottom: 0;
    //background: transparent url(images/email-field-1.png) 100% no-repeat;
    background-size: cover;
    height: 100px;
    background-size: 100% 100px;
    display: flex;
    content-align: center;
    align-items: center;
    width: 100%;
    align-content: flex-end;
    &:hover ${this} {
        border: 0px solid black;
        background-size: cover;
        background-size: 100% 100px;
    }
    margin-bottom: 1rem;
`;

const InputWindow = styled.input`
    opacity: 1;
    background-color: #353839;
    width: 95%;
    height: 50px;
    background-size: 100% 100px;
    background-repeat: no-repeat;
    color: white;
    box-sizing: border-box;
    border-radius: 5px;
    outline: grey solid 2px;
    display: inline-block;
    align-self: flex-end;
    border: none;

    padding: 0.875rem;
    margin: 0 auto;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    background-clip: padding-box;
    line-height: 1.7;
    font-size: 1.1875rem;
    -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    overflow: visible;

    &:hover ${this} {
        border: 0px solid black;
        //background: transparent url(images/email-field-1-outline.png) 50% no-repeat;
        background-size: cover;
        background-size: 100% 100px;
        outline: grey solid 2px;
    }

    &:focus ${this} {
        border: 0px solid black;
        outline: none;
        outline: grey solid 2px;
        box-shadow: none;
        //background-color: hsla(0, 0%, 100%, .1);
    }

    &:after ${this} {
        background-size: cover;
    }
`;

const AnimalPage = () => {
    const history = useHistory();

    const page = useStoreState((state) => state.animal.page);
    const limit = useStoreState((state) => state.animal.limit);
    const pages = useStoreState((state) => state.animal.pages);
    const getPages = useStoreActions((actions) => actions.animal.getPages);

    const [width, setWidth] = useState<number | null>(null);

    const searchString = useStoreState((state) => state.animal.search);
    const setSearchString = useStoreActions((state) => state.animal.setSearch);

    const setPage = useStoreActions((actions) => actions.animal.setPage);
    const setLimit = useStoreActions((actions) => actions.animal.setLimit);

    const getAnimals = useStoreActions((actions) => actions.animal.getAnimals);
    const animals = useStoreState((state) => state.animal.animals);

    const search = window.location.search;
    const params = new URLSearchParams(search);

    const [text, setText] = useState('');
    const [gameText, setGameText] = useState<any | null>([]);

    const username = sessionStorage.getItem('username');

    useEffect(() => {
        const listener = () => {
            return setWidth(window.innerWidth);
        };

        listener();

        window.addEventListener('resize', listener);

        return function cleanup() {
            window.removeEventListener('resize', listener);
        };
    }, []);

    useEffect(() => {
        history.push({
            pathname: '/animals',
            search: '?page=' + page,
        });
        (async () => {
            await getPages({ limit: limit, search: searchString });
            await getAnimals({ page: page, limit: limit, search: searchString });
        })();
    }, []);

    function handleClick(page) {
        //parseInt("" + params.get("page")
        setPage(page);
        history.push({
            pathname: '/animals',
            search: '?page=' + page,
        });
        (async () => {
            await getPages({ limit: limit, search: searchString });
            await getAnimals({ page: page, limit: limit, search: searchString });
        })();
    }

    function filterData() {
        console.log('searchString', searchString);
        (async () => {
            await getPages({ limit: limit, search: searchString });
            const data = await getAnimals({ page: page, limit: limit, search: searchString });

            console.log('animalsLength', data.length);
            if (data.length === 0) {
                setText('Nebyli nalezeni žádné data.');
                console.warn('setText', pages);
            } else {
                setText('');
            }
        })();

        console.error('pages', pages);
    }

    function updateSearchString(value, e) {
        setSearchString(value);
    }

    console.log('window.height window.width', window.innerHeight - 520, window.innerWidth);

    return (
        <div style={{ maxHeight: '100%' }}>
            <Head title={'Animals'} />
            <Navigation />
            <Content>
                <Box className={'search-field-container'}>
                    <SearchField
                        searchText={searchString}
                        placeholder="Search..."
                        classNames="search-field"
                        onEnter={() => filterData()}
                        onChange={(value, e) => updateSearchString(value, e)}
                        onSearchClick={() => filterData()}
                    />
                </Box>
                <div style={{ marginBottom: '5rem', fontSize: '2rem' }}>{text}</div>
                <Grid container spacing={10} style={{ paddingLeft: 50, paddingRight: 50 }}>
                    {animals.length > 0 ? (
                        animals.map((animal) => {
                            return (
                                <Grid item xs={12} sm={6} lg={4} xl={3} className="pb-3-5" key={animal.id}>
                                    <Card className="card">
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/images/${animal.images[0].urlName}`}
                                            alt="Paella dish"
                                        />
                                        <CardContent>
                                            <Typography className="bold" variant="subtitle1" gutterBottom component="h2">
                                                {animal.name}
                                            </Typography>
                                            <Typography component="p">
                                                <i>{animal.latinname}</i>
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-end"
                                                alignItems="flex-end"
                                                onClick={() => history.push(`/animals/detail/${animal.id}`)}
                                            >
                                                <DetailButton size="small">
                                                    Detail <Icon className="text-and-icon-space" icon="chevron-right" />
                                                </DetailButton>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })
                    ) : text === '' ? (
                        <ContenLoader animals={Array(8).fill(0)} />
                    ) : null}
                </Grid>
                {pages !== null && (
                    <Pagination
                        page={page}
                        className="pagination"
                        color="primary"
                        count={pages}
                        variant="outlined"
                        shape="rounded"
                        size={width !== null ? (width <= 430 ? 'medium' : 'large') : 'large'}
                        onChange={(e, page) => handleClick(page)}
                        style={{ marginTop: '3rem' }}
                    />
                )}
            </Content>
            <Footer positionAbsolute={text !== ''} />
        </div>
    );
};

export default AnimalPage;
