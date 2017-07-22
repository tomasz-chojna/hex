import {gql, graphql} from "react-apollo";
import React from 'react';

const HelloWorld = ({ data: {loading, error, helloWorld }}) => {
    if (error) {
        return <p>{error.message}</p>;
    }

    if (helloWorld) {
        return <h1>{ helloWorld.text }</h1>
    }

    return <p>Loading ...</p>;
};

export const HelloWorldComponent = graphql(gql`
    query HelloWorldQuery {
        helloWorld {
            text
        }
    }
`)(HelloWorld);