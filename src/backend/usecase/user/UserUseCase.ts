import type UserRepository from "@app/backend/repositories/UserRepository";
import type {
  AddUserParams,
  AuthUserParams,
  DeleteUserParams,
  GetUserByEmailParams,
  GetUserParams,
  ListUserParams,
  UpdateUserParams,
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

  public async getUserByEmail(data: GetUserByEmailParams) {
    try {
      return await this.userRepository.getUserByEmail(data);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }


  public async getUser(data: GetUserParams) {
    try {
      return await this.userRepository.getUser(data);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }

  public async listUsers(data: ListUserParams) {
    try {
      return await this.userRepository.listUsers(data);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }

  public async addUser(data: AddUserParams) {
    try {
      return await this.userRepository.addUser(data);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }

  public async removeUser(data: DeleteUserParams) {
    try {
      return await this.userRepository.removeUser(data);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }

  public async updateUser(data: UpdateUserParams) {
    try {
      return await this.userRepository.updateUser(data);
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
