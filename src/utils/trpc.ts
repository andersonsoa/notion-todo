// utils/trpc.ts
import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../server/routers/app";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
