import { router } from "../trpc";
import { authRouter } from "./auth";
import { healthRouter } from "./health";

export const v1Router = router({
  health: healthRouter,
  auth: authRouter,
});
