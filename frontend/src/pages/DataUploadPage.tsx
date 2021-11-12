import React, { useEffect, FC } from 'react';
import styled from 'styled-components';
import Head from '../components/Head';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Content from '../components/common/Content';
import { Button } from '@mui/material';
import Ajax from 'src/tools/Ajax';

const Container = styled.div`
    background-color: white;
    color: black;
    height: 100vh;
`;

function HomePage() {
    async function sendData() {
        try {
            await Ajax.post('/upload');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Container>
            <Head title={'Zoo Admin'} />
            <Navigation />
            <>
                <Content>
                    <h2 className={'heading'}>
                        <Button variant="outlined" color="success" onClick={() => sendData()}>
                            Upload App Data
                        </Button>
                    </h2>
                </Content>
            </>
            <Footer />
        </Container>
    );
}

export default HomePage;
