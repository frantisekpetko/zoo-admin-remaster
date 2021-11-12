import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from '../store';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Content from '../components/common/Content';
import styled from 'styled-components';
import AnimalContent from '../components/AnimalContent';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import Head from "../components/Head";

const BackButton = styled(Button)`
    position: relative;
    left: 25%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    //margin-left: 35%;
    margin-top: 1rem;
`;

const Image = styled.img`
    width: 20rem;
    height: 15rem;
`;

const Extlink = styled.a`
    text-decoration: underline;
    color: blue;
    font-size: 1rem;
`;

interface id {
    id?: string | undefined;
}

export default function DetailPage() {
    const history = useHistory();
    const { id }: id = useParams();
    const getAnimal = useStoreActions((actions) => actions.animal.getAnimal);
    const animal = useStoreState((state) => state.animal.animal);

    useEffect(() => {
        (async () => {
            await getAnimal(id);
        })();
    }, []);

    return (
        <div>
            <Navigation />
            <Head title={'Animals detail'} />
            <div style={{ position: 'absolute' }}>
                <BackButton variant="contained" color="success" onClick={() => history.push(`/`)}>
                    Back
                </BackButton>
            </div>
            <AnimalContent>
                <h3>{animal?.name}</h3>
                <i>{animal?.latinname}</i>
                <p className={'proper-width'}>{animal?.description}</p>
                <Image src={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/images/${animal?.images[0].urlName}`} />
                <div className={'flex'} style={{ marginTop: '2rem', flexFlow: 'column wrap', display: 'flex', justifyContent: 'center' }}>
                    <div>Odkazy:</div>
                    {animal?.extlinks.map((e, id) => {
                        const link = `${e.link.slice(0, 35)}...`;
                        return (
                            <div className={'page-break'} style={{ width: '100%', paddingLeft: '1rem', paddingRight: '1rem', marginTop: '0.5rem' }} key={id}>
                                <p>
                                    <Extlink href={e.link} target={'_blank'} style={{ width: '100%' }}>
                                        {link}
                                    </Extlink>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </AnimalContent>
            <Footer />
        </div>
    );
}
