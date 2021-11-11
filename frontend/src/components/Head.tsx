import React from "react";

import {Helmet} from "react-helmet";

const Head = (props) => {
    return <><Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
        <title>{props.title}</title>
        <link rel="canonical" href={`${window.location.hostname}:${window.location.port}`} />
    </Helmet></>;
};

export default Head;