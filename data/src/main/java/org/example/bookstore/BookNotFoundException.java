package org.example.bookstore;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(int id) { super("no book found with id " + id); }
}
