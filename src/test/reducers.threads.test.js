// src/test/reducers.threads.test.js
import threadsReducer, {
  addCommentOptimistic,
} from "../features/threads/threadsSlice";
import { fetchThreads } from "../features/threads/threadsThunks";

describe("threadsSlice reducer", () => {
  const initialState = {
    items: [],
    detail: null,
    loading: false,
    error: null,
    creating: false,
  };

  it("should return initial state", () => {
    expect(threadsReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle fetchThreads.pending", () => {
    const result = threadsReducer(initialState, {
      type: fetchThreads.pending.type,
    });
    expect(result.loading).toBe(true);
  });

  it("should handle addCommentOptimistic", () => {
    const state = {
      ...initialState,
      detail: { id: "1", comments: [], totalComments: 0 },
      items: [{ id: "1", totalComments: 0 }],
    };

    const action = addCommentOptimistic({
      threadId: "1",
      comment: { id: "c1", content: "test" },
    });

    const result = threadsReducer(state, action);

    expect(result.detail.comments.length).toBe(1);
    expect(result.detail.totalComments).toBe(1);
  });
});
