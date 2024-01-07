//code from a cypress/auth0 tutorial
// describe('Auth0', function () {
//   beforeEach(function () {
//     cy.task('db:seed');
//     cy.intercept('POST', '/graphql').as('createUserAccount');
//     cy.loginToAuth0(
//       Cypress.env('auth0_username'),
//       Cypress.env('auth0_password')
//     )
//     cy.visit('/');
//   })

//   it('shows onboarding', function () {
//     cy.contains('Get Started').should('be.visible');
//   })
// })