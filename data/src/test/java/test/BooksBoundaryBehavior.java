package test;

import org.example.bookstore.Book;
import org.example.bookstore.BookStore;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.Response;
import java.util.List;

import static java.util.Arrays.asList;
import static javax.ws.rs.core.Response.Status.OK;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

@Disabled
class BooksBoundaryBehavior {
    private static final GenericType<List<Book>> BOOKS_TYPE = new GenericType<>() {};
    private static final List<Book> BOOKS = asList(
        Book.builder().id(1).author("J.R.R. Tolkien").title("The Hobbit").stock(3).build(),
        Book.builder().id(2).author("J.R.R. Tolkien").title("The Lord Of The Rings").stock(2).build()
    );

    private static BookStore store = mock(BookStore.class);
    // @RegisterExtension static JaxRsTestExtension JAX_RS = new JaxRsTestExtension(new BooksBoundary(store));

    @Test void shouldGetBooks() {
        given(store.getAll()).willReturn(BOOKS);

        Response response = null;//JAX_RS.GET("/");

        assertThat(response.getStatusInfo()).isEqualTo(OK);
        List<Book> books = response.readEntity(BOOKS_TYPE);
        assertThat(books.get(0)).usingRecursiveComparison().isEqualTo(BOOKS.get(0));
        assertThat(books.get(1)).usingRecursiveComparison().isEqualTo(BOOKS.get(1));
        assertThat(books).hasSize(2);
    }
}
