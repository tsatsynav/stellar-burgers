import store from './store';

describe('rootReducer', () => {
  it('should return initial state for unknown action', () => {
    const initialState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(initialState);
  });
});
