describe('Can login and go into profile', () => {
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
    cy.get('.button__login').should('be.visible');
    cy.get('.button__login').click();
    cy.get('#profile').should('be.visible');
    cy.get('input').should('be.visible');
  })

  describe('UserView Component', () => {
    beforeEach(() => {
      cy.get('.button__login').click();
      cy.get('.favoriteButton').first().click();
      cy.get('.saveButton').last().click();
      cy.get('#profile').click();
    });

    it('Loads page content properly', () => {
      cy.get('.filter-buttons').should('be.visible');
      cy.get('.filter-buttons').should('have.descendants', 'button');
    });
    
    it('Shows all saved controversies on profile page load', () => {
      cy.get('.card-content').should('be.visible');
      cy.get('h2').should('contain', 'Controversies and harassment incidents[edit]');
      cy.get('img').should('be.visible');
      cy.get('h3').should('contain', 'Internet raids');
    });

    it('Should show favorited cards', () => {
      cy.get('.show-favorites').click();
      cy.get('.card-content').should('be.visible');
      cy.get('h2').should('contain', 'Controversies and harassment incidents[edit]');
      cy.get('img').should('be.visible');
      cy.get('h3').should('contain', 'Internet raids');
    });

    it('Should return to show all saved', () => {
      cy.get('.show-all').click();
      cy.get('.card-content').should('be.visible');
      cy.get('h2').should('contain', 'Controversies and harassment incidents[edit]');
      cy.get('img').should('be.visible');
      cy.get('h3').should('contain', 'Internet raids');
    });

    it('Should return to the main page on header click', () => {
      cy.get('.header-text').should('be.visible');
      cy.get('.header-text').click();
      cy.get('input').should('be.visible');
      cy.get('h2').should('be.visible');
    })
  });
});