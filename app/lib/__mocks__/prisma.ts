import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

// 2 between each individual test the mock should be reset to its original state
beforeEach(() => {
  mockReset(prisma);
});

// 3 create and export a "deep mock" of Prisma Client
// every function will be available at vi.fn()
const prisma = mockDeep<PrismaClient>();
export default prisma;
