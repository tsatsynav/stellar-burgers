declare namespace Cypress {
  interface Chainable {
    setToken(): Chainable<void>;
    clearToken(): Chainable<void>;
  }
}