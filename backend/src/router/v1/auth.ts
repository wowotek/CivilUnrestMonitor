import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import type { AuthSvc } from "../../service/auth";

export const authRouter = (authSvc?: AuthSvc) =>
  router({
    signUp: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
      )
      .mutation(async ({ input }) => {
        const signUpOut = await authSvc?.signUp(input);
        return { message: "User signed up", data: signUpOut };
      }),

    signIn: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const signInOut = await authSvc?.signIn(input);
        return { message: "User signed in", data: signInOut };
      }),
  });
