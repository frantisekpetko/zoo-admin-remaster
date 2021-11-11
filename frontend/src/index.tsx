import React from 'react';
import ReactDOM from 'react-dom';
import 'src/index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from 'src/store';
import Routes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import OpeningPage from './pages/OpeningPage';
import NotFound404 from './pages/NotFound404';

ReactDOM.render(
    <React.Fragment>
        <StoreProvider store={store}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
        </StoreProvider>
    </React.Fragment>,
    document.getElementById('app')
);
