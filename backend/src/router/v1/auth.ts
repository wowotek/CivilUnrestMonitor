import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input }) => {
      // sign-up logic here
      return { message: "User signed up", email: input.email };
    }),

  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // sign-in logic here
      return { message: "User signed in", email: input.email };
    }),
});
