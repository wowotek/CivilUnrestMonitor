import type { AuthSvc } from "../../core/service/auth";
import type { HealthSvc } from "../../core/service/health";
import { router } from "../trpc";
import { authRouter } from "./auth";
import { healthRouter } from "./health";

export const v1Router = (healthSvc?: HealthSvc, authSvc?: AuthSvc) =>
  router({
    health: healthRouter(healthSvc),
    auth: authRouter(authSvc),
  });
