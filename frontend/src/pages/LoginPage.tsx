import TextField from '@mui/material/TextField';
import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { Grid, Paper, Button } from '@mui/material';
import ErrorMessage from '../components/ErrorMessage';
import StarfieldAnimation from 'react-starfield-animation';
import Box from '@mui/material/Box';
import Navigation from 'src/components/common/Navigation';
import { useStoreActions, useStoreState } from '../store';
import SuccessMessage from '../components/SuccessMessage';
import Timeout = NodeJS.Timeout;
import { Shift } from 'ambient-cbg';
import Head from '../components/Head';
import Content from '../components/common/Content';
import Footer from '../components/common/Footer';

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Lock } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Heading = styled.h1`
    margin-top: 0;
    color: black;
`;

const FormContainer = styled.div`
    max-width: 450px;
    margin-bottom: 4rem;
    border-radius: 5px;
    margin-left: 2rem;
    margin-right: 2rem;
`;

const FormField = styled(TextField)`
    width: 100%;
`;
const PaperItem = styled(Paper)`
    padding: 2rem;
    //background-color: #ACE500;
    background-color: goldenrod;
`;
const GridCenterItem = styled(Grid)`
    width: 100vw;
    margin-top: 7.5rem;
`;

const CustomizedButton = styled(Button)`
    margin-bottom: 2rem;
    width: 100%;
    background-color: purple !important;
    color: white !important;
`;

const LoginPage: FC = (props: any) => {
    const signIn = useStoreActions((actions) => actions.user.signIn);

    const load = useStoreActions((actions) => actions.user.loadTokenToMemory);
    const save = useStoreActions((actions) => actions.user.saveTokenToStorage);
    const setUserUsername = useStoreActions((actions) => actions.user.setUsername);
    //const loading = useStoreState((state) => state.trait.loading);

    const token = useStoreState((state) => state.user.accessToken);

    const navigate = useHistory();

    useEffect(() => {
        //document.body.style.backgroundColor = '#b8860b';
        document.body.style.backgroundColor = '#FAFAD2';
        //setLoading(true);

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setErrorMsg(null);

        try {
            const data = await signIn({ username, password });
            console.log('data', data.data.accessToken);
            setLoading(true);
            save(data.data.accessToken);
            setUserUsername(data.data.username);
            load();
            setLoading(false);
            window.location.reload();
            navigate.push('/');
            console.log('token', token);
        } catch (error: any) {
            console.log('errorMessage', error);
            const errorMessage = error.response.data.message;

            setErrorMsg(errorMessage);
        }
    };

    function goToRegister() {
        navigate.push('/register');
    }

    return (
        <React.Fragment>
            <Head title={'Login Page'} />
            {errorMsg && <ErrorMessage errors={errorMsg} />}
            <Navigation />
            <Content>
                <FormContainer>
                    <Heading>Uživatelský login</Heading>
                    <FormField
                        id="outlined-name"
                        label="Username"
                        margin="dense"
                        variant="filled"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormField
                        id="outlined-name"
                        label="Password"
                        margin="dense"
                        variant="filled"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button color="inherit" fullWidth onClick={submit}>
                        Login in
                    </Button>

                    <Button color="primary" fullWidth onClick={goToRegister} sx={{ mt: 2 }}>
                        Don't have an account? Sign up now!
                    </Button>
                </FormContainer>
            </Content>
            <Footer />
        </React.Fragment>
    );
};

export default LoginPage;
