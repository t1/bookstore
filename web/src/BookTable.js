import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import {Box, Button, Heading, Section, Table} from "react-bulma-components";
import BookRow from "./BookRow";

class BookTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            books: []
        };
    }

    setError(text) {
        this.setState({
            isLoaded: true,
            error: {message: text}
        })
    }

    setLoaded(books) {
        this.setState({
            isLoaded: true,
            books
        })
    }

    componentDidMount() {
        let booksUrl = "http://localhost:8080/books";
        let useFetch = false;
        if (useFetch) {
            // fetch can't be stubbed by Cypress (and the workaround doesn't work for me)
            // see https://github.com/cypress-io/cypress/issues/95
            fetch(booksUrl)
                .then(res => {
                    if (res.ok) return res.json();
                    else throw new Error(res.statusText);
                })
                .then(
                    (result) => { this.setLoaded(result) },
                    (error) => { this.setError(error.message) }
                )
        } else {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let books = JSON.parse(xhr.response);
                        if (!Array.isArray(books)) {
                            this.setError("didn't receive a list of books");
                        } else {
                            this.setLoaded(books)
                        }
                    } else {
                        this.setError("failed")
                    }
                }
            }.bind(this);
            xhr.onerror = function () {
                this.setError("failed");
            }.bind(this);
            xhr.open('GET', booksUrl, true);
            xhr.send();
        }
    }

    render() {
        let {error, isLoaded, books} = this.state;
        if (error) {
            return <Box><Section><Heading id="#message">
                Error while loading books: {error.message}
            </Heading></Section></Box>;
        } else if (!isLoaded) {
            return <Button id="#loading" fullwidth loading isStatic/>;
        } else if (books && books.length === 0) {
            return <Button id="message" fullwidth isStatic>No Books In Stock</Button>;
        } else {
            return (
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
            );
        }
    }
}

export default BookTable
