Cypress.Commands.add(
  'login',
  (email = 'test@example.com', password = 'password123') => {
    cy.visit('/login');

    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);

    cy.contains('button', 'Login').click();
  },
);
