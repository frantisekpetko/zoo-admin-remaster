import React from 'react';
import "app/PageForVerifyEntry.scss";
import TextField from '@material-ui/core/TextField';



const LoaderIn = (props) => (
    <div className="body-color-verify">
        <div className="page-loader-verify">
            <div className="border-radius-for-icon">
                <img className="logo" src={"public/logo.png"}/>
            </div>
            <h2 className="header2 h2-size">Sweetheart.cz</h2>
            <h3 className="header3 h3-size">Tato aplikace je pouze preview budoucí skutečný webové aplikace.</h3>
            <h3 className="header3 h3-size">Pro vstup do aplikace zadejte prosím ověřovací heslo:</h3>

            <TextField
                id="filled-name"
                label={"heslo"}
                value={props.name}
                onChange={(e)=> props.changePassword(e, "heslo")}
                margin="normal"
                variant="filled"
                className="ml-1"
            />

        </div>
    </div>
);

export default LoaderIn;