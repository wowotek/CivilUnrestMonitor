import type { HealthSvc } from "../../service/health";
import { publicProcedure, router } from "../trpc";

export const healthRouter = (healthSvc?: HealthSvc) =>
  router({
    check: publicProcedure.query(async () => {
      return healthSvc?.check();
    }),
  });
