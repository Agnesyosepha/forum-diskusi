// src/test/reducers.auth.test.js
import authReducer, { logout } from "../features/auth/authSlice";
import { loginUser } from "../features/auth/authThunks";

describe("authSlice reducer", () => {
  const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  };

  it("should return initial state", () => {
    expect(authReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle logout", () => {
    const state = { ...initialState, token: "abc", isAuthenticated: true };
    const result = authReducer(state, logout());
    expect(result.token).toBe(null);
    expect(result.isAuthenticated).toBe(false);
  });

  it("should handle loginUser.pending", () => {
    const result = authReducer(initialState, { type: loginUser.pending.type });
    expect(result.loading).toBe(true);
  });

  it("should handle loginUser.fulfilled", () => {
    const result = authReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: { token: "123" },
    });
    expect(result.token).toBe("123");
    expect(result.isAuthenticated).toBe(true);
  });
});
