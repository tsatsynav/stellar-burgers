import authReducer, { loginUser, logoutUser } from './authSlice';

describe('auth slice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle loginUser.pending', () => {
    const state = authReducer(
      undefined,
      loginUser.pending('', { email: 'test', password: '123' })
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.fulfilled', () => {
    const user = { email: 'john@test.com', name: 'John' };
    const action = loginUser.fulfilled(user, '', {
      email: 'test',
      password: '123'
    });
    const state = authReducer(undefined, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should handle loginUser.rejected', () => {
    const error = new Error('Invalid credentials');
    const state = authReducer(
      undefined,
      loginUser.rejected(error, '', { email: 'test', password: '123' })
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Invalid credentials');
  });

  it('should handle logoutUser.fulfilled', () => {
    const initialState = {
      user: { email: 'test@test.com', name: 'John' },
      isAuthenticated: true,
      loading: false,
      error: null,
      forgotPasswordSuccess: false,
      resetPasswordSuccess: false
    };
    const state = authReducer(
      initialState,
      logoutUser.fulfilled(undefined, '')
    );
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
