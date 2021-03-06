package test;

import com.github.t1.jaxrsclienttest.JaxRsTestExtension;
import org.example.bookstore.Book;
import org.example.bookstore.BookStore;
import org.example.bookstore.BooksBoundary;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;

import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.Response;
import java.util.List;

import static java.util.Arrays.asList;
import static javax.ws.rs.core.Response.Status.OK;
import static org.assertj.core.api.BDDAssertions.then;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

class BooksBoundaryBehavior {
    private static final GenericType<List<Book>> BOOKS_TYPE = new GenericType<>() {};
    private static final List<Book> BOOKS = asList(
        Book.builder().id(1).author("J.R.R. Tolkien").title("The Hobbit").stock(3).build(),
        Book.builder().id(2).author("J.R.R. Tolkien").title("The Lord Of The Rings").stock(2).build()
    );

    private static BookStore store = mock(BookStore.class);
    @RegisterExtension static JaxRsTestExtension JAX_RS = new JaxRsTestExtension(new BooksBoundary(store));

    @Test void shouldGetBooks() {
        given(store.getAll()).willReturn(BOOKS);

        Response response = JAX_RS.GET("/");

        then(response.getStatusInfo()).isEqualTo(OK);
        List<Book> books = response.readEntity(BOOKS_TYPE);
        then(books.get(0)).usingRecursiveComparison().isEqualTo(BOOKS.get(0));
        then(books.get(1)).usingRecursiveComparison().isEqualTo(BOOKS.get(1));
        then(books).hasSize(2);
    }
}
