import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Section, Table} from "react-bulma-components";

export default () => (
    <Section>
        <Table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Author</th>
                <th>Title</th>
                <th>Stock</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>1</th>
                <td>J.R.R. Tolkien</td>
                <td>The Hobbit</td>
                <th>3</th>
            </tr>
            <tr>
                <th>2</th>
                <td>J.R.R. Tolkien</td>
                <td>The Lord Of The Rings</td>
                <th>1</th>
            </tr>
            </tbody>
        </Table>
    </Section>
)
