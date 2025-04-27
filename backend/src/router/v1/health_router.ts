import type { HealthSvc } from "../../core/service/health_svc";
import { publicProcedure, router } from "../trpc";

export const healthRouter = (healthSvc?: HealthSvc) =>
  router({
    check: publicProcedure.query(async () => {
      return healthSvc?.check();
    }),
  });
