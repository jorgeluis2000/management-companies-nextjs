import type UserRepository from "@app/backend/repositories/UserRepository";
import type {
  AuthUserParams,
  GetUserByEmailParams,
} from "@app/utils/domain/types/UserParams";

export default class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async authUser(data: AuthUserParams) {
    try {
      return await this.userRepository.authUser(data);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }

  public async session(data: GetUserByEmailParams) {
    try {
      return await this.userRepository.getUserByEmail(data);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }
}
