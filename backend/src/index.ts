import {
  fastifyTRPCPlugin,
  type FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext, appRouter, type AppRouter } from "./router";
import { authSvc, healthSvc } from "./core/service";
import { userRepository } from "./repository";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle("postgres://postgres:postgres@localhost:5432/postgres");

const userRepo = userRepository(db);

const healthService = healthSvc;
const authService = authSvc(userRepo);

const router = appRouter(healthService, authService);

const server = fastify({
  maxParamLength: 5000,
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: router,
    createContext,
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

(async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
