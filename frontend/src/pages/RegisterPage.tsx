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
import { Shift } from 'ambient-cbg';
import Head from '../components/Head';
import Content from '../components/common/Content';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Footer from '../components/common/Footer';

const Heading = styled.h1`
    margin-top: 0;
`;

const FormContainer = styled.div`
    max-width: 450px;
    margin-bottom: 4rem;
    border-radius: 5px;
`;

const FormField = styled(TextField)`
    width: 100%;
`;

const PaperItem = styled(Paper)`
    padding: 2rem;
    background-color: #ace500;
`;
const GridCenterItem = styled(Grid)`
    width: 100vw;
    height: 100vh;
`;

const CustomizedButton = styled(Button)`
    margin-bottom: 2rem;
    width: 100%;
    background-color: purple !important;
    color: white !important;
`;

const RegisterPage: FC = (props: any) => {
    const signUp = useStoreActions((actions) => actions.user.signUp);

    const load = useStoreActions((actions) => actions.user.loadTokenToMemory);
    const save = useStoreActions((actions) => actions.user.saveTokenToStorage);

    //const loading = useStoreState((state) => state.trait.loading);

    const navigate = useHistory();

    useEffect(() => {
        document.body.style.backgroundColor = '#b8860b';
        return () => {
            document.body.style.backgroundColor = '';
        };
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const submit = async () => {
        setErrorMsg(null);

        try {
            await signUp({ username, password });
            setSuccessMsg('You are registered!');
        } catch (error: any) {
            console.log('errorMessage', error);
            const errorMessage = error.response.data.message;

            setErrorMsg(errorMessage);
        }
    };

    function goToLogin() {
        navigate.push('/login');
    }

    return (
        <React.Fragment>
            <Head title={'Register Page'} />
            {errorMsg && <ErrorMessage errors={errorMsg} />}
            {successMsg && <SuccessMessage message={successMsg} />}
            <Navigation />
            <Content>
                <FormContainer>
                    <Heading>Uživatelská Registrace</Heading>
                    <FormField
                        id="outlined-name"
                        label="Username"
                        margin="dense"
                        variant="filled"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FormField
                        id="outlined-name"
                        label="Password"
                        margin="dense"
                        variant="filled"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button color="inherit" fullWidth onClick={submit}>
                        Register
                    </Button>

                    <Button color="primary" fullWidth onClick={goToLogin} sx={{ mt: 2 }}>
                        Have already account? Sign in now!
                    </Button>
                </FormContainer>
            </Content>
            <Footer />
        </React.Fragment>
    );
};

export default RegisterPage;
