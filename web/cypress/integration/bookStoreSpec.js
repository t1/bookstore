describe('My First Test', () => {
    before(() => {
        // cy.request('POST', '/test/seed/post', {
        //     title: 'First Post',
        //     authorId: 1,
        //     body: '...'
        // });
        // cy.log('hi');
    });

    it('should show message when no books in stock', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'http://localhost:8080/books',
            response: []
        });

        cy.visit('/');

        cy.get('#message').should('contain', 'No Books In Stock');
    });

    it('should show loading indicator while loading books in stock', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'http://localhost:8080/books',
            response: [],
            delay: 1000
        });

        cy.visit('/');

        // cy.get('#message').should('contain', 'No Books In Stock');
    });

    it('should show error when loading books in stock', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'http://localhost:8080/books',
            status: 500,
            response: {message: "some internal error"}
        });

        cy.visit('/');

        // cy.get('#message').should('contain', 'Error while loading books');
    });

    it('should show the books in stock', () => {
        cy.server();
        cy.route('GET', 'http://localhost:8080/books', 'fixture:books.json');

        cy.visit('/');

        cy.url().should('include', '/');

        cy.get('#book-1-id').should('contain', '1');
        cy.get('#book-1-author').should('contain', 'J.R.R. Tolkien');
        cy.get('#book-1-title').should('contain', 'The Hobbit');
        cy.get('#book-1-stock').should('contain', '3');

        cy.get('#book-2-id').should('contain', '2');
        cy.get('#book-2-author').should('contain', 'J.R.R. Tolkien');
        cy.get('#book-2-title').should('contain', 'The Lord Of The Rings');
        cy.get('#book-2-stock').should('contain', '2');
    });
});
