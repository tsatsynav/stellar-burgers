describe('Burger Constructor E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.setToken();
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearToken();
  });

  it('should add ingredient to constructor', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-testid="constructor-bun"]').should('contain', 'Краторная булка');
  });

  it('should open and close ingredient modal', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.contains('Соус Spicy-X').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create order, show modal, then clear constructor', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Биокотлета из марсианской Магнолии').click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-testid="modal"]').should('be.visible');
    cy.contains('12345').should('exist');
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="constructor-bun"]').should('not.exist');
    cy.get('[data-testid="constructor-ingredients"]').children().should('have.length', 0);
  });
});