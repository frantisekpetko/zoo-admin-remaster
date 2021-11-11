import React, { FC, useState } from 'react';
import {
    AppBar,
    Button,
    Dialog,
    ListItemText,
    Toolbar,
    IconButton,
    Typography,
    List,
    ListItem,
    Divider,
    Slide,
    TextField
}
from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { TransitionProps } from '@mui/material/transitions';
import styled from 'styled-components';

import {FormGroup, Label, Input} from 'reactstrap';



const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children?: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Container = styled.div`
    width: 75%;
    margin-left: auto;
    margin-right: auto;
`;

const FormField = styled(TextField)`
    width: 100%;
    background-color: white !important;
    color: white !important;
`;

interface Props {
    handleOpen: () => void,
    handleClose: () => void,
    open: boolean,
    handleFullscreenMenu: () => void,
}



const FullscreenModal: FC<Props> = (props) => {

    function setAllClose() {
        props.handleFullscreenMenu();
        props.handleClose();
    }

    const [value, setValue] = useState('');

    return <div>
        <Dialog
            fullScreen
            open={props.open}
            onClose={() => setAllClose()}
            TransitionComponent={Transition}
        >
            <AppBar style={{backgroundColor: 'goldenrod'}}>
            {/*r sx={{ position: 'relative' }*/}
                <Toolbar>

                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Command
                    </Typography>
                    <Button autoFocus color="inherit" onClick={() => setAllClose()} style={{marginRight: '2rem'}}>
                        save
                    </Button>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setAllClose()}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div  style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
            <Container>
            <List style={{marginTop: '5rem'}}>
                <ListItem button>
                    <ListItemText primary="Phone ringtone" secondary="Titania" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText
                        primary="Default notification ringtone"
                        secondary="Tethys"
                    />
                </ListItem>
            </List>

                <FormField
                    id="outlined-name"
                    label="Password"
                    margin="dense"
                    variant="filled"
                    type="password"
                    value={value}
                    onChange={e => setValue(e.target.value )}
                    style={{backgroundColor: 'red'}}

                />
                {/*<TextField
                    id="outlined-name"
                    label="Password"
                    margin="dense"
                    variant="filled"
                    type="password"
                    value={value}
                    onChange={e => setValue(e.target.value )}
                    style={{ color: 'white'}}
                    InputProps={{
                        style: {
                            backgroundColor: '#9EFD38',
                            color: 'white'

                        }
                    }}
                />*/}
                <FormField
                    id="outlined-name"
                    label="Password"
                    margin="dense"
                    variant="filled"
                    type="password"
                    value={value}
                    onChange={e => setValue(e.target.value )}

                />
            </Container>
            </div>
        </Dialog>
    </div>;
};

export default FullscreenModal;