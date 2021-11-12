import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

/*
  background-color: #f7c5c0;
 */

const ErrorContainer = styled.div`
    width: 100%;
    padding: 8px 16px;
    color: #a51809;
    box-sizing: border-box;
    background-color: #f7c5c0;
`;

const ErrorHeading = styled.h1`
    font-size: 18px;
    margin: 10px 0;
`;

const ErrorList = styled.ul`
    padding-left: 20px;
`;

const ErrorMessage: FC<{ errors: any }> = (props) => {
    let constraints: any = null;

    const [display, setDisplay] = useState(true);

    useEffect(() => {
        const timeout: any = setTimeout(() => {
            setDisplay(false);
        }, 3000);

        return function cleanup() {
            clearTimeout(timeout);
        };
    });

    const renderMessageArray = (errors: any) => {
        console.log('errors', errors);

        if (Array.isArray(errors)) {
            constraints = errors.map((constraint, idx) => <li key={idx}>{constraint}</li>);
            //commands.log('Array.isArray(errors)')
        }
        if (errors.hasOwnProperty('response') && errors.response.hasOwnProperty('message') && typeof errors.response.message == 'string') {
            constraints = <li>{errors.message}</li>;
            //commands.log('errors.hasOwnProperty(\'response\') && errors.response.hasOwnProperty(\'message\') && typeof errors.response.message == \'string\'')
        }

        if (errors.hasOwnProperty('response') && errors.response.hasOwnProperty('message') && Array.isArray(errors.response.message)) {
            constraints = errors.response.message.map((constraint: string, idx: number) => <li key={idx}>{constraint}</li>);
            //commands.log('errors.hasOwnProperty(\'response\') && errors.response.hasOwnProperty(\'message\') && Array.isArray(errors.response.message)')
        }

        return constraints;
    };

    const message = props.errors;
    console.log('condition', Array.isArray(message) || typeof message === 'object');
    return (
        <ErrorContainer style={!display ? { display: 'none' } : { display: 'block' }}>
            <span className="close-btn red-close-btn" onClick={() => setDisplay(false)}>
                &times;
            </span>
            <ErrorHeading>Oops!</ErrorHeading>
            {Array.isArray(message) || typeof message === 'object' ? (
                <ErrorList>{renderMessageArray(message)}</ErrorList>
            ) : (
                <ErrorList>
                    <li>{message}</li>
                </ErrorList>
            )}
        </ErrorContainer>
    );
};

export default ErrorMessage;
