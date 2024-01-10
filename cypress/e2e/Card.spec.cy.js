describe('Card Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/w/api.php?action=query&list=search**', { fixture: 'initialSearch.json' }).as('initialSearch');
    cy.intercept('GET', '**/w/api.php?action=parse&prop=sections**', { fixture: 'sectionsRequest.json' }).as('sectionsRequest');
    cy.intercept('GET', '**/w/api.php?action=parse&format=json**', { fixture: 'controversiesRequest.json' }).as('controversiesRequest');
    cy.visit('http://localhost:3000/');
    cy.wait('@initialSearch');
    cy.wait('@sectionsRequest');
    cy.wait('@controversiesRequest');
  });

  it('Renders snippet properly', () => {
    cy.get('.card-content').should('be.visible');
    cy.get('h2').should('contain', 'Controversies and harassment incidents[edit]');
    cy.get('img').should('be.visible');
    cy.get('h3').should('contain', 'Internet raids');
  });

  it('Handles show more/show less functionality', () => {
    cy.get('.card-content').should('be.visible');
    cy.get('h3').first().click();
    cy.get('p').should('contain', 'According to The Washington Post, \"the site\'s users have managed to pull off some of the highest-profile collective actions in the history of the Internet.\"[1]');
    cy.get('p').should('have.length', '36');
    cy.get('h3').first().click();
    cy.get('p').should('have.length', '10');
  });
});