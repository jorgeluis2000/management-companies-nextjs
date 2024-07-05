import type {
  AddUserParams,
  AuthUserParams,
  UpdateUserProfileParams,
} from "@app/utils/domain/types/user/UserParams";
import { InvalidParamsError } from "@app/utils/errors/ExceptionFactory";
import { Role, UserTheme } from "@prisma/client";
import z from "zod";

export default class UserValidator {
  public validationAddUser(data: AddUserParams) {
    try {
      const verifySchema = z.object({
        email: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .email("El formato del email no es correcto"),
        name: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .min(2, "Verifica que hayas colocado un nombre"),
        password: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .min(4, "La contraseña debe tener mínimo 4 caracteres"),
        role: z.nativeEnum(Role),
        theme: z.nativeEnum(UserTheme),
        language: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .min(1, "Verifica que hayas colocado el lenguaje."),
        timeZone: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .min(1, "Verifica que hayas colocado la zona horaria."),
        image: z
          .string({
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .optional(),
        phone: z
          .string({
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .optional(),
      });
      const result = verifySchema.safeParse(data);
      if (!result.success) {
        return result.error.issues;
      }
      return [];
    } catch (error) {
      throw new InvalidParamsError("Error en los parámetros.");
    }
  }

  public validationAuth(data: AuthUserParams) {
    try {
      const verifySchema = z.object({
        email: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .email("El formato del email no es correcto"),
        password: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .min(4, "La contraseña debe tener mínimo 4 caracteres"),
      });
      const result = verifySchema.safeParse(data);
      if (!result.success) {
        return result.error.issues;
      }
      return [];
    } catch (error) {
      throw new InvalidParamsError("Error en los parámetros.");
    }
  }

  public validationUpdateProfile(data: UpdateUserProfileParams) {
    try {
      const verifySchema = z.object({
        email: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .email("El formato del email no es correcto"),
        name: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .min(2, "Verifica que hayas colocado un nombre"),
        role: z.nativeEnum(Role),
        theme: z.nativeEnum(UserTheme),
        language: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .min(1, "Verifica que hayas colocado el lenguaje."),
        timeZone: z
          .string({
            required_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .trim()
          .min(1, "Verifica que hayas colocado la zona horaria."),
        image: z
          .string({
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .optional(),
        phone: z
          .string({
            invalid_type_error:
              "Verifica que hayas llenado todos los campos obligatorios.",
          })
          .optional(),
      });
      const result = verifySchema.safeParse(data);
      if (!result.success) {
        return result.error.issues;
      }
      return [];
    } catch (error) {
      throw new InvalidParamsError("Error en los parámetros.");
    }
  }
}
