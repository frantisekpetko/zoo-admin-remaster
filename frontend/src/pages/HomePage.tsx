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

function HomePage() {


    return (
      <Container>
          <Head title={'Zoo Admin'} />
          <Navigation />
          <>
              <Content>
                  <h2 className={'heading'}>
                      Hey, You are logged in !
                  </h2>
              </Content>
          </>
          <Footer />
      </Container>
    );
}

export default HomePage;
