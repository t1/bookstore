package org.example.bookstore;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;

@Singleton
@Startup
public class TestDataLoader {
    @Inject BookStore store;

    @PostConstruct void startup() {
        store.add(Book.builder().id(1).author("J.R.R. Tolkien").title("The Hobbit").stock(3).build());
        store.add(Book.builder().id(2).author("J.R.R. Tolkien").title("The Lord Of The Rings").stock(2).build());
    }
}
