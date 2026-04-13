describe('Burger Constructor E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.setToken();
    cy.visit('/');
    cy.wait('@getIngredients', { timeout: 10000 });
    cy.contains('Краторная булка N-200i').should('be.visible');
  });

  afterEach(() => {
    cy.clearToken();
  });

  it('should add ingredient to constructor', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .find('button')
      .contains('Добавить')
      .click();
    cy.contains('Краторная булка N-200i (верх)').should('exist');
    cy.contains('Краторная булка N-200i (низ)').should('exist');
  });

  it('should open and close ingredient modal', () => {
    cy.get('[data-testid="ingredient-link"]')
      .contains('Биокотлета из марсианской Магнолии')
      .click();
    cy.get('[data-testid="modal"]', { timeout: 10000 }).should('be.visible');
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get('[data-testid="modal"] button').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="ingredient-link"]').contains('Соус Spicy-X').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create order, show modal, then clear constructor', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .find('button')
      .contains('Добавить')
      .click();
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .find('button')
      .contains('Добавить')
      .click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.get('[data-testid="modal"]', { timeout: 10000 }).should('be.visible');
    cy.contains('12345').should('exist');
    cy.get('[data-testid="modal"] button').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    // Ждём асинхронной очистки конструктора
    cy.wait(1000);
    // Проверяем, что конструктор пуст
    cy.get('.constructor-element').should('have.length', 0);
    cy.get('.constructor-element_pos_top').should('not.exist');
    cy.get('.constructor-element_pos_bottom').should('not.exist');
  });
});
