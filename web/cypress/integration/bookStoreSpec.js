describe('My First Test', () => {
    before(() => {
        // cy.request('POST', '/test/seed/post', {
        //     title: 'First Post',
        //     authorId: 1,
        //     body: '...'
        // });
        // cy.log('hi');
        cy.server();
        cy.route('GET', 'http://localhost:8080/books', 'fixture:books.json')
    });

    it('should show the books in stock', () => {
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
    })
});
