import { describe, expect, it } from "vitest";
import { assertLimit } from "./api-limit";

describe("assertLimit", () => {
  it("returns false if the user is over the free tier limit", () => {
    expect(
      assertLimit({
        count: 5,
      }),
    ).toBeFalsy();
  });

  it("returns true if the user does not have an apiLimitEntry at all", () => {
    expect(assertLimit(null)).toBeTruthy();
  });

  it("returns true if the user is not over the free tier limit", () => {
    expect(assertLimit({ count: 1 })).toBeTruthy();
  });
});
