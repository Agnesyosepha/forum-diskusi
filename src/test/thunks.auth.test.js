// src/test/thunks.auth.test.js
import { loginUser } from "../features/auth/authThunks";
import { forumService } from "../api/forumService";

jest.mock("../api/forumService");

describe("auth thunks", () => {
  it("loginUser fulfilled", async () => {
    forumService.login.mockResolvedValue({
      data: { token: "123" },
    });

    const dispatch = jest.fn();
    const result = await loginUser({ email: "a", password: "b" })(
      dispatch,
      () => ({ auth: {} }),
      undefined
    );

    expect(result.payload.token).toBe("123");
  });

  it("loginUser rejected", async () => {
    forumService.login.mockRejectedValue(new Error("Invalid"));

    const dispatch = jest.fn();
    const result = await loginUser({ email: "a", password: "b" })(
      dispatch,
      () => ({ auth: {} }),
      undefined
    );

    expect(result.payload).toBe("Invalid");
  });
});
