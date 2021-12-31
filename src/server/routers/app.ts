import * as trpc from "@trpc/server";
import { z } from "zod";
import { getTodos } from "../../utils/notion";

export const appRouter = trpc.router().query("get-todos", {
  async resolve({ input }) {
    const todos = await getTodos();

    return todos;
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
