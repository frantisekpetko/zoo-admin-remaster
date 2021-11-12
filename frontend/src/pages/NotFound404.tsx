import React, { useEffect, FC } from 'react';
import 'src/App.css';
import styled from 'styled-components';
import Head from '../components/Head';
import Navigation from '../components/common/Navigation';
import { Grid } from '@mui/material';
import Footer from '../components/common/Footer';
import Content from '../components/common/Content';

const Container = styled.div`
    background-color: white;
    color: black;
    height: 100vh;
`;

function NotFound404() {
    return (
        <Container>
            <Head title={'404'} />
            <Navigation />
            <Content>
                <h2 className={'heading'}>404 Error - Page with url '{window.location.pathname}' not found.</h2>
            </Content>
            <Footer positionAbsolute={false} />
        </Container>
    );
}

export default NotFound404;
