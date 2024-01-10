describe('Can search for a Controversy', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/w/api.php?action=query&list=search**', { fixture: 'initialSearch.json' }).as('initialSearch');
        cy.intercept('GET', '**/w/api.php?action=parse&prop=sections**', { fixture: 'sectionsRequest.json' }).as('sectionsRequest');
        cy.intercept('GET', '**/w/api.php?action=parse&format=json**', { fixture: 'controversiesRequest.json' }).as('controversiesRequest');
    
        cy.visit('http://localhost:3000/');
        cy.wait('@initialSearch');
        cy.wait('@sectionsRequest');
        cy.wait('@controversiesRequest');
      });
      
      it('Can login', () => {
        cy.get('.button__login').should('be.visible')
        cy.get('.button__login').click()
        cy.get('#profile').should('be.visible')
        cy.get('input').should('be.visible')

    })
describe('Should be able to search for a controversy', () => {
        beforeEach(() => {
          cy.get('.button__login').click()
          cy.get('.favoriteButton').first().click();
          cy.get('.saveButton').last().click();
        //   cy.visit('http://localhost:3000/Profile');
        }); 
    
    it('Searches for a term, then clears input', () => {
        cy.get('input[type="text"]').should('be.visible');
        cy.get('input[type="text"]').type('Rush Limbaugh');
        cy.get('input[type="text"]').should('have.value', 'Rush Limbaugh')
      cy.get('#search-button').should('be.visible');
      cy.get('#search-button').click()
      cy.get('input[type="text"]').should('have.value', '')
    });
  
    it('Displays controversies for a search result', () => {
      cy.get('.card').should('be.visible');
      cy.get('.result-name').should('contain', '4chan');
      cy.get('.results-list')
        .children()
        .first()
        .within(() => {
            cy.get('.card-content').should('be.visible');
            cy.get('h2').should('contain', 'Controversies and harassment incidents[edit]');
            cy.get('img').should('be.visible')
            cy.get('h3').should('contain', 'Internet raids')
            cy.contains('button', '😡Save Controversy😡');
            cy.contains('button', '🤬Save as favorite controversy🤬');
        });
        cy.get('.results-list')
          .children()
          .last()
          .within(() => {
            cy.get('.card-content').should('be.visible');
            cy.get('h2').should('contain', 'Controversies and harassment incidents[edit]');
            cy.get('img').should('be.visible')
            cy.get('h3').should('contain', 'Internet raids')
            cy.contains('button', '😡Save Controversy😡');
            cy.contains('button', '🤬Save as favorite controversy🤬');
          });
    });
  });
})