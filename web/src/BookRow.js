import React from 'react';

export default ({book}) => (
    <tr id={`book-${book.id}`}>
        <td id={`book-${book.id}-id`}>{book.id}</td>
        <td id={`book-${book.id}-author`}>{book.author}</td>
        <td id={`book-${book.id}-title`}>{book.title}</td>
        <td id={`book-${book.id}-stock`}>{book.stock}</td>
    </tr>
);
