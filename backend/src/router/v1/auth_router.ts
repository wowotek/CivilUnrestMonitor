import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import type { AuthSvc } from "../../core/service/auth_svc";
import { mapError } from "../mapper";

export const authRouter = (authSvc?: AuthSvc) =>
  router({
    signUp: publicProcedure
      .input(
        z.object({
          username: z.string().email(),
          password: z.string().min(6),
        }),
      )
      .mutation(async ({ input }) => {
        try {
          const signUpOut = await authSvc?.signUp(input);
          return { message: "User signed up", data: signUpOut };
        } catch (err) {
          return mapError(err as Error);
        }
      }),

    signIn: publicProcedure
      .input(
        z.object({
          username: z.string().email(),
          password: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        try {
          const signInOut = await authSvc?.signIn(input);
          return { message: "User signed in", data: signInOut };
        } catch (err) {
          return mapError(err as Error);
        }
      }),
  });
