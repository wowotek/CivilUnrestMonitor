import type { HealthCheckOut } from "../domain";

export type HealthSvc = {
  check: () => Promise<HealthCheckOut>;
};

export const healthSvc = {
  check: async (): Promise<HealthCheckOut> => {
    return { status: "ok" };
  },
} satisfies HealthSvc;
