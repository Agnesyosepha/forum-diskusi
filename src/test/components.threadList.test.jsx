// src/test/components.threadList.test.jsx

// Mock react-router
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <span>{children}</span>,
}));

// Mock fetchThreads supaya tidak menjalankan thunk
jest.mock("../features/threads/threadsThunks", () => ({
  fetchThreads: () => ({ type: "threads/fetchThreads" }),
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import ThreadsList from "../features/threads/ThreadsList";

const mockStore = configureStore([]); // tanpa middleware thunk

describe("ThreadsList Component", () => {
  it("renders thread list title", () => {
    const store = mockStore({
      threads: {
        items: [],
        loading: false,
      },
    });

    render(
      <Provider store={store}>
        <ThreadsList />
      </Provider>
    );

    expect(screen.getByText(/Diskusi tersedia/i)).toBeInTheDocument();
  });
});
