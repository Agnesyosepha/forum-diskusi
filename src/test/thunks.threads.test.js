// src/test/thunks.threads.test.js
import { fetchThreads } from "../features/threads/threadsThunks";
import { forumService } from "../api/forumService";

jest.mock("../api/forumService");

describe("threads thunks", () => {
  it("fetchThreads fulfilled", async () => {
    forumService.getThreads.mockResolvedValue({
      data: { threads: [{ id: "1", title: "A" }] },
    });

    // dispatch thunk directly (mock dispatch)
    const dispatch = jest.fn();
    const result = await fetchThreads()(dispatch, () => ({}), undefined);

    expect(result.payload[0].id).toBe("1");
  });
});
