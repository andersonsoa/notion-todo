import * as trpc from "@trpc/server";
import { z } from "zod";
import { getTodos, addTodo, updateTodoDone } from "../../utils/notion";

export const appRouter = trpc
  .router()
  .query("get-todos", {
    async resolve({ input }) {
      const todos = await getTodos();

      return todos;
    },
  })
  .mutation("create-todo", {
    input: z.object({
      todo: z.string(),
    }),
    async resolve({ input }) {
      const { todo } = input;

      const newTodo = await addTodo(todo);

      return newTodo;
    },
  })
  .mutation("update-todo-done", {
    input: z.object({
      id: z.string(),
      done: z.boolean(),
    }),
    async resolve({ input }) {
      const { id, done } = input;

      return await updateTodoDone(id, done);
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
