import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Heading, Navbar} from "react-bulma-components";

export default () => (
    <Navbar color='success' fixed='top'>
        <Navbar.Brand>
            <Navbar.Item renderAs="a" href="#"><Heading className='logo'>Book-Store</Heading></Navbar.Item>
        </Navbar.Brand>
    </Navbar>
)
