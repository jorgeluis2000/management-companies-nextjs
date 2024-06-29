import type { Role } from "@prisma/client";


export type UserAuth = { id: string, email: string, name: string, role: string, image: string | null }