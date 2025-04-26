import type { AuthSvc } from "../../core/service/auth_svc";
import type { HealthSvc } from "../../core/service/health_svc";
import { router } from "../trpc";
import { authRouter } from "./auth_router";
import { healthRouter } from "./health_router";

export const v1Router = (healthSvc?: HealthSvc, authSvc?: AuthSvc) =>
  router({
    health: healthRouter(healthSvc),
    auth: authRouter(authSvc),
  });
