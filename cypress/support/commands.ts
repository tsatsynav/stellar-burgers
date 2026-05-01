import './commands';

Cypress.Commands.add('setToken', () => {
  cy.setCookie('accessToken', 'mock-access-token');
  localStorage.setItem('refreshToken', 'mock-refresh-token');
});

Cypress.Commands.add('clearToken', () => {
  cy.clearCookie('accessToken');
  localStorage.removeItem('refreshToken');
});