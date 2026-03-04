import { describe, it, expect } from "vitest";
import { getOrdersRepository } from "./factory";

describe("getOrdersRepository", () => {
  it("returns a repository with getOrders", async () => {
    const repo = getOrdersRepository();
    expect(repo.getOrders).toBeDefined();
    const orders = await repo.getOrders();
    expect(Array.isArray(orders)).toBe(true);
  });
});
