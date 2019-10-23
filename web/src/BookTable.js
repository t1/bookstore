import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Section, Table} from "react-bulma-components";
import BookRow from "./BookRow";

let books = [{
    id: 1,
    author: 'J.R.R. Tolkien',
    title: 'The Hobbit',
    stock: 3
}, {
    id: 2,
    author: 'J.R.R. Tolkien',
    title: 'The Lord Of The Rings',
    stock: 2
}];

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
            {books.map((book) =>
                <BookRow key={book.id} book={book}/>
            )}
            </tbody>
        </Table>
    </Section>
)
