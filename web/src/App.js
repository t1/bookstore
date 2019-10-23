import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Container, Section} from 'react-bulma-components';
import AppHeader from "./AppHeader";
import BookTable from "./BookTable";

export default function App() {
    return (
        <Container>
            <AppHeader/>
            <Section>
                <BookTable/>
            </Section>
        </Container>
    );
}
