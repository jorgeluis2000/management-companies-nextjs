import { PrismaClient } from "@prisma/client";
import { LANGUAGES } from "../data/languages"
import { TIMEZONE } from "../data/timezones"

const prisma = new PrismaClient()

async function main() {

    await prisma.timeZone.createMany({
        data: TIMEZONE
    })

    await prisma.language.createMany({
        data: LANGUAGES
    })

    await prisma.user.create({
        data: {
            email: "admin@gmail.com",
            role: 'ADMIN',
            password: "1234",
            phone: "1234",
            name: "admin test",
            userConfig: {
                create: {
                    theme: 'AUTO',
                    language: {
                        connect: {
                            code: 'es'
                        }
                    },
                    timeZone: {
                        connect: {
                            zone: 'America/Bogota'
                        }
                    }
                }
            }
        }
    })


}


main().catch(err => {
    console.error(err)
    process.exit(1)
})
    .finally(async () => {
        await prisma.$disconnect()
    })