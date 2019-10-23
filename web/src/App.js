import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Container} from 'react-bulma-components';
import AppHeader from "./AppHeader";
import AppBody from "./BookTable";

export default function App() {
    return (
        <Container>
            <AppHeader/>
            <AppBody/>
        </Container>
    );
}
