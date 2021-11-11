import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

/*
  background-color: #f7c5c0;
 */

const SuccessContainer = styled.div`
    width: 100%;
    padding: 8px 16px;
    color: black;
    background-color: #80cd32;
    box-sizing: border-box;
`;

const SuccessHeading = styled.h1`
    font-size: 18px;
    margin: 10px 0;
`;

const SuccessList = styled.ul`
    padding-left: 20px;
`;

const SuccessMessage: FC<{ message: string }> = (props) => {
    const constraints: any = null;
    const [display, setDisplay] = useState(true);

    useEffect(() => {
        const timeout: any = setTimeout(() => {
            setDisplay(false);
        }, 3000);

        return function cleanup() {
            clearTimeout(timeout);
        };
    });

    const message = props.message;
    console.log('condition', Array.isArray(message) || typeof message === 'object');
    return (
        <SuccessContainer style={!display ? { display: 'none' } : { display: 'block' }}>
            <span className="close-btn green-close-btn" onClick={() => setDisplay(false)}>
                &times;
            </span>
            <SuccessHeading>Success!</SuccessHeading>
            <SuccessList>
                <li>{message}</li>
            </SuccessList>
        </SuccessContainer>
    );
};

export default SuccessMessage;
