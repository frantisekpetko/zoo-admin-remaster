import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FormControlLabel, FormGroup, Menu, MenuItem, Switch } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useStoreActions, useStoreState } from '../../store';
import { Link, useHistory } from 'react-router-dom';
import FullscreenModal from '../FullscreenModal';

export default function Navigation(props) {
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [openFullsreenModal, setOpenFullscreenModal] = React.useState(false);

    const handleClickOpenFullscreenModal = () => {
        setOpenFullscreenModal(true);
    };

    const handleClickCloseFullscreenModal = () => {
        setOpenFullscreenModal(false);
    };

    const [open, setOpen] = React.useState(false);

    const handleFullscreenMenu = () => {
        console.log(open);
        setOpen(!open);
    };

    const logOut = useStoreActions((actions) => actions.user.logOut);
    const username = useStoreState((state) => state.user.username);
    //console.log('username', username);
    const token = sessionStorage.getItem('accessToken');
    //console.log('accessToken', token, sessionStorage.getItem('accessToken'));
    const navigate = useHistory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        if (token != null) {
            console.log('tokenx', token);
        }
        setAnchorEl(null);
        logOut();
        navigate.push('/');
        window.location.reload();
    };
    //#666600
    return (
        <Box sx={{ flexGrow: 1 }} style={{ zIndex: 1000, position: 'relative' }}>
            <div id="mySidenav" className="sidenav" style={open ? { width: '100%', zIndex: 9999999 } : { width: '0' }}>
                <a href="#" className="closebtn" onClick={() => handleFullscreenMenu()}>
                    &times;
                </a>
                {
                token !== null
                  ?
                  (
                    <>
                   <Link style={{ color: '#6D5210 !important' }} to="/">
                       HomePage
                   </Link>
                   <Link style={{ color: '#6D5210 !important' }} to="/animalsr">
                       Animals
                   </Link>
                    </>
                    )
                    :
                    (
                    <>
                    <Link style={{ color: '#6D5210 !important' }} to="/login">
                    Login
                    </Link>
                    <Link style={{ color: '#6D5210 !important' }} to="/register">
                    Register
                    </Link>
                    </>
                    )

                }

            </div>
            {openFullsreenModal && (
                <FullscreenModal
                    handleFullscreenMenu={handleFullscreenMenu}
                    handleOpen={handleClickOpenFullscreenModal}
                    handleClose={handleClickCloseFullscreenModal}
                    open={openFullsreenModal}
                />
            )}
            <AppBar
                position="static"
                style={token !== null ? { backgroundColor: 'darkolivegreen', color: 'white' } : { backgroundColor: 'darkolivegreen', color: 'white' }}
                className={'navigation'}
            >
                <Toolbar>
                    {/*'#ACE500'*/}

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
                            Zoo Admin
                        </Link>
                    </Typography>

                    {/*<FormGroup>
                        <FormControlLabel
                            control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                            label={auth ? 'Logout' : 'Login'}
                        />
                    </FormGroup>*/}
                    {token !== null ? (
                        <div>
                            <Link to={'/animals'} className={'customized-link'}>
                                <Button color="inherit">List of Animals</Button>
                            </Link>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(e) => handleMenu(e)}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>{username !== null ? username : 'Account'}</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <>
                            <Link to={'/login'} className={'customized-link'}>
                                <Button color="inherit">Login</Button>
                            </Link>
                            <Link to={'/register'} className={'customized-link'}>
                                <Button color="inherit">Register</Button>
                            </Link>
                        </>
                    )}
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ ml: 0 }} onClick={() => handleFullscreenMenu()}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
