export type User = {
  serial: string;
  username: string;
  password: string;
  role: "user" | "admin";
  status: "active" | "deactivated";
  createdAt: Date;
  updatedAt: Date;
};
