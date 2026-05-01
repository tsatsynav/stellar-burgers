// Константы для селекторов
const SELECTORS = {
  ingredientLink: '[data-testid="ingredient-link"]',
  modal: '[data-testid="modal"]',
  modalOverlay: '[data-testid="modal-overlay"]',
  modalCloseButton: '[data-testid="modal"] button',
  constructorBunTop: '.constructor-element_pos_top',
  constructorBunBottom: '.constructor-element_pos_bottom',
  constructorIngredient: '.constructor-element',
  addButton: 'button:contains("Добавить")'
};

describe('Burger Constructor E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');

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
      .find(SELECTORS.addButton)
      .click();
    cy.contains('Краторная булка N-200i (верх)').should('exist');
    cy.contains('Краторная булка N-200i (низ)').should('exist');
  });

  it('should open and close ingredient modal', () => {
    cy.get(SELECTORS.ingredientLink).contains('Биокотлета из марсианской Магнолии').click();
    cy.get(SELECTORS.modal, { timeout: 10000 }).should('be.visible');
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get(SELECTORS.modalCloseButton).click();
    cy.get(SELECTORS.modal).should('not.exist');

    cy.get(SELECTORS.ingredientLink).contains('Соус Spicy-X').click();
    cy.get(SELECTORS.modal).should('be.visible');
    cy.get(SELECTORS.modalOverlay).click({ force: true });
    cy.get(SELECTORS.modal).should('not.exist');
  });

  it('should create order, show modal, then clear constructor', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .find(SELECTORS.addButton)
      .click();
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .find(SELECTORS.addButton)
      .click();

    // Исправленный поиск кнопки
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.get(SELECTORS.modal, { timeout: 10000 }).should('be.visible');
    cy.contains('12345').should('exist');
    cy.get(SELECTORS.modalCloseButton).click();
    cy.get(SELECTORS.modal).should('not.exist');

    cy.wait(1000);
    cy.get(SELECTORS.constructorIngredient).should('have.length', 0);
    cy.get(SELECTORS.constructorBunTop).should('not.exist');
    cy.get(SELECTORS.constructorBunBottom).should('not.exist');
  });
});