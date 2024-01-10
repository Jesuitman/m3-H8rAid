describe('App spec', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/w/api.php?action=query&list=search**', { fixture: 'initialSearch.json' }).as('initialSearch');
      cy.intercept('GET', '**/w/api.php?action=parse&prop=sections**', { fixture: 'sectionsRequest.json' }).as('sectionsRequest');
      cy.intercept('GET', '**/w/api.php?action=parse&format=json**', { fixture: 'controversiesRequest.json' }).as('controversiesRequest');
      cy.visit('http://localhost:3000/');
      cy.wait('@initialSearch');
      cy.wait('@sectionsRequest');
      cy.wait('@controversiesRequest');
    });
  
    it('should display all content on page load', () => {
      cy.get('.App').should('be.visible');
      cy.get('.App-header').should('be.visible');
      cy.get('.logo-link').should('be.visible');
      cy.get('.button__login').should('be.visible');
      cy.get('.random-headline').should('be.visible');
      cy.get('.result-name').should('contain', '4chan');
      cy.get('.random-headline').should('contain', 'Random Controversy');
      cy.get('.card').should('be.visible');
      cy.get('.card')
        .children()
        .first()
        .within(() => {
          cy.get('h2').should('contain', 'Controversies and harassment incidents[edit]');
          cy.get('img').should('be.visible');
          cy.get('h3').should('contain', 'Internet raids');
          cy.contains('button', '😡Save Controversy😡');
          cy.contains('button', '🤬Save as favorite controversy🤬');
        });
        cy.get('.card')
        .children()
        .last()
        .within(() => {
          cy.get('h2').should('contain', 'Controversies and harassment incidents[edit]');
          cy.get('img').should('be.visible');
          cy.get('h3').should('contain', 'Internet raids');
          cy.contains('button', '😡Save Controversy😡');
          cy.contains('button', '🤬Save as favorite controversy🤬');
        });
    });
  });
  
  //Login couldn't work because Cypress couldn't session 
  // describe('Logged in tests', () => {
  //   beforeEach(() => {
  //     cy.intercept('GET', '**/w/api.php?action=query&list=search**', { fixture: 'initialSearch.json' }).as('initialSearch');
  //     cy.intercept('GET', '**/w/api.php?action=parse&prop=sections**', { fixture: 'sectionsRequest.json' }).as('sectionsRequest');
  //     cy.intercept('GET', '**/w/api.php?action=parse&format=json**', { fixture: 'controversiesRequest.json' }).as('controversiesRequest');
  //     cy.visit('http://localhost:3000/');
  //     cy.wait('@initialSearch');
  //     cy.wait('@sectionsRequest');
  //     cy.wait('@controversiesRequest');
  //     cy.loginToAuth0('haderaid9@gmail.com', 'JZgyS@xJi9ej@V9');
  //   });
    // it('should display logged in content', () => {
    //   cy.get('#profile').should('be.visible');
    //   cy.get('#profile').should('contain', 'Profile');
    // });
  // });