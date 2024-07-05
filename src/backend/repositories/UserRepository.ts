import type {
  AddUserParams,
  AuthUserParams,
  DeleteUserParams,
  GetUserByEmailParams,
  GetUserParams,
  ListUserParams,
  UpdateUserParams,
} from "@app/utils/domain/types/user/UserParams";
import type { PrismaClient } from "@prisma/client";

export default class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async getUser(data: GetUserParams) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: data.id,
        },
        select: {
          id: true,
          email: true,
          idAuthZero: true,
          name: true,
          role: true,
          image: true,
          phone: true,
          userConfig: {
            select: {
              id: true,
              theme: true,
              language: {
                select: {
                  code: true,
                  name: true,
                },
              },
              timeZone: {
                select: {
                  zone: true,
                  utcOffset: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  public async getUserByEmail(data: GetUserByEmailParams) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
        select: {
          id: true,
          email: true,
          idAuthZero: true,
          name: true,
          role: true,
          image: true,
          phone: true,
          userConfig: {
            select: {
              id: true,
              theme: true,
              language: {
                select: {
                  code: true,
                  name: true,
                },
              },
              timeZone: {
                select: {
                  zone: true,
                  utcOffset: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  public async listUsers(data: ListUserParams) {
    try {
      const skip = (data.page - 1) * data.limit;
      return await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          idAuthZero: true,
          name: true,
          role: true,
          image: true,
          phone: true,
          userConfig: {
            select: {
              id: true,
              theme: true,
              language: {
                select: {
                  code: true,
                  name: true,
                },
              },
              timeZone: {
                select: {
                  zone: true,
                  utcOffset: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: data.limit,
      });
    } catch (error) {
      return [];
    }
  }

  public async countUsers() {
    try {
      const users = await this.prisma.user.count();
      return users;
    } catch (error) {
      return 0;
    }
  }

  public async addUser(data: AddUserParams) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          role: data.role,
          password: data.password,
          image: data.image,
          name: data.name,
          phone: data.phone,
          userConfig: {
            create: {
              theme: data.theme,
              language: {
                connect: {
                  code: data.language,
                },
              },
              timeZone: {
                connect: {
                  zone: data.timeZone,
                },
              },
            },
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          image: true,
          phone: true,
          userConfig: {
            select: {
              id: true,
              theme: true,
              language: {
                select: {
                  code: true,
                  name: true,
                },
              },
              timeZone: {
                select: {
                  zone: true,
                  utcOffset: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  public async removeUser(data: DeleteUserParams) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: data.id,
        },
        select: {
          id: true,
        },
      });
      return user !== null;
    } catch (error) {
      return false;
    }
  }

  public async updateUser(data: UpdateUserParams) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          email: data.email,
          name: data.name,
          role: data.role,
          image: data.image,
          phone: data.phone,
          password: data.password,
          userConfig: {
            update: {
              theme: data.theme,
              codeLanguage: data.language,
              codeTimezone: data.timeZone,
            },
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          image: true,
          phone: true,
          userConfig: {
            select: {
              id: true,
              theme: true,
              language: {
                select: {
                  code: true,
                  name: true,
                },
              },
              timeZone: {
                select: {
                  zone: true,
                  utcOffset: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  public async authUser(data: AuthUserParams) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
          password: data.password,
        },
        select: {
          id: true,
          email: true,
          idAuthZero: true,
          name: true,
          role: true,
          image: true,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }
}
