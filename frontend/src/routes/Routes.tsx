import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import OpeningPage from 'src/pages/OpeningPage';
import LoginPage from 'src/pages/LoginPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import DetailPage from '../pages/DetailPage';
import AnimalPage from '../pages/AnimalPage';
import NotFound404 from '../pages/NotFound404';
import DataUploadPage from '../pages/DataUploadPage';

const Routes = () => {
    const isAuth = sessionStorage.getItem('accessToken');
    console.log('isAuth', isAuth);
    return (
        <Switch>
            <Route exact path="/" render={(props) => (isAuth !== null ? <HomePage /> : <OpeningPage />)} />

            <Route
                exact
                path="/login"
                render={(props) =>
                    isAuth !== null ? (
                        <Redirect
                            to={{
                                pathname: '/',
                                //state: { from: props.location }
                            }}
                        />
                    ) : (
                        <LoginPage />
                    )
                }
            />

            <Route
                exact
                path="/upload"
                render={(props) =>
                    isAuth !== null ? (
                        <DataUploadPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                //state: { from: props.location }
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path="/animals"
                render={(props) =>
                    isAuth !== null ? (
                        <AnimalPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                //state: { from: props.location }
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path="/register"
                render={(props) =>
                    isAuth === null ? (
                        <RegisterPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                //state: { from: props.location }
                            }}
                        />
                    )
                }
            />

            <Route
                exact
                path={'/animals/detail/:id'}
                render={() =>
                    isAuth !== null ? (
                        <DetailPage />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                            }}
                        />
                    )
                }
            />

            <Route component={NotFound404} />
        </Switch>
    );
};

export default Routes;
