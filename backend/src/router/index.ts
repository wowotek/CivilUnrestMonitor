import type { AuthSvc } from "../core/service/auth_svc";
import type { HealthSvc } from "../core/service/health_svc";
import { v1Router } from "./v1";
import { router } from ".";

export const appRouter = (healthSvc?: HealthSvc, authSvc?: AuthSvc) => {
  return router({
    v1: v1Router(healthSvc, authSvc),
  });
};

const initiatedAppRouter = appRouter(undefined);
export type AppRouter = typeof initiatedAppRouter;

export * from "./context";
export * from "./trpc";
export * from "./mapper";
