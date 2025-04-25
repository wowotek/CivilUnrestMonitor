import type { User } from "../core/domain";
import type { UserRepository } from "../core/repository";
import * as dto from "./dto";

let storage: Array<dto.UserDto> = [];

export const userRepository = {
  create: async (input: User) => {
    const userDto = dto.fromUserDomain(input);
    userDto.id = storage.length + 1; // Simulate auto-increment ID
    storage.push(userDto);
  },
  findByUsername: async (username: string) => {
    return dto.toUserDomain(storage.find((user) => user.username === username));
  },
} satisfies UserRepository;
