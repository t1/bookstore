package org.example.bookstore;

import com.github.t1.log.Logged;
import org.eclipse.microprofile.metrics.annotation.Timed;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import java.util.List;

import static com.github.t1.log.LogLevel.INFO;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Stateless
@Path("/")
@Timed @Logged(level = INFO)
@Produces(APPLICATION_JSON)
public class BooksBoundary {
    @Inject BookStore store;

    @GET public List<Book> getAll() { return store.getAll(); }

    @GET @Path("/{id}") public Book getBook(@PathParam("id") int id) { return store.get(id); }

    @PUT public void putBook(List<Book> books) {
        store.clear();
        books.forEach(book -> store.add(book));
    }
}
