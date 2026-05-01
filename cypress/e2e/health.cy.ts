describe('Health check', () => {
  it('should load the page', () => {
    cy.visit('/');
    cy.contains('Соберите бургер'); // любой текст с главной страницы
  });
});