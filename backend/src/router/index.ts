import type { AuthSvc } from "../service/auth";
import type { HealthSvc } from "../service/health";
import { router } from "./trpc";
import { v1Router } from "./v1";

export const appRouter = (healthSvc?: HealthSvc, authSvc?: AuthSvc) => {
  return router({
    v1: v1Router(healthSvc, authSvc),
  });
};

const initiatedAppRouter = appRouter(undefined);
export type AppRouter = typeof initiatedAppRouter;

export * from "./context";
