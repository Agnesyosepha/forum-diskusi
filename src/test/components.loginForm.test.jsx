// src/test/components.loginForm.test.jsx
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <span>{children}</span>,
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import LoginForm from "../features/auth/LoginForm";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([]);

describe("LoginForm Component", () => {
  it("renders inputs and button", () => {
    const store = mockStore({ auth: { loading: false } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Masukkan email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Masukkan password")
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });
});
