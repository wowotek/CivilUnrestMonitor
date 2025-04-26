import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { UserNotFoundError, type User } from "../core/domain";
import type { UserRepository } from "../core/repository";
import * as dto from "./dto";
import { eq } from "drizzle-orm";

export const userRepository = (db: NodePgDatabase) =>
  ({
    create: async (input: User) => {
      const userDto = dto.fromUserDomain(input);
      await db.insert(dto.UserDto).values(userDto);
    },
    findByUsername: async (username: string) => {
      const userDto = await db
        .select()
        .from(dto.UserDto)
        .where(eq(dto.UserDto.username, username))
        .limit(1);
      if (userDto.length === 0) {
        throw new UserNotFoundError(username);
      }

      return dto.toUserDomain(userDto[0]);
    },
  }) satisfies UserRepository;
