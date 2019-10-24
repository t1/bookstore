package org.example.bookstore;

import javax.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
public class BookStore {
    private Map<Integer, Book> books = new ConcurrentHashMap<>();

    public void clear() { books.clear(); }

    public List<Book> getAll() { return new ArrayList<>(books.values()); }

    public Book get(int id) {
        return books.computeIfAbsent(id, i -> {
            throw new BookNotFoundException(id);
        });
    }

    public void add(Book book) { books.put(book.getId(), book); }
}
