import React from 'react';
import {Helmet} from "react-helmet";
import API from './utils/API';


class HeadHtml extends React.Component {

    constructor(props) {
        super(props);
        this.state = {appName: "Loading .."};
        this.hasUnmounted = false;
    }


    componentDidMount()
    {
        this.hasUnmounted = true;

        this.hasUnmounted && API.get("/app-name")
                .then((response) => {
                    const appName = response.data[0].appName;
                    //commands.log("response", response.data);
                    this.hasUnmounted && this.setState({appName: appName});

                })
                .catch((error) => {
                    console.log(error);
        })
    }

    componentWillUnmount() {
        this.hasUnmounted = false;
    }


    render()
    {
        const {appName} = this.state;

        let checkForIsDebug = !(this.props.isDebug === null || this.props.isDebug === undefined);

        const isServerError = (process.env.NODE_ENV === 'development'); //add !, negation, when app will be adding to production

        const {pageTitle} = this.props;
        return <Helmet>
                <meta charSet="utf-8"/>
                <title>{`${
                    !checkForIsDebug 
                        ? appName 
                        : (isServerError ? appName : "Debug >" )} 
                      ${! checkForIsDebug 
                        ? "-" 
                        : ""} ${isServerError ? "- Server Error" : pageTitle}`}
                </title>
                <link rel="shortcut icon" href={"public/favicon.ico"} />
                {/*process.env.PUBLIC_URLs + "/favicon.ico"*/}
                /*
                * TODO udělat kompatibilizu icony pro android mobilní zařízení
                */
                {/*<link rel="manifest" href="/manifest.json"/>*/}
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
        </Helmet>
     }

}

export default HeadHtml;
