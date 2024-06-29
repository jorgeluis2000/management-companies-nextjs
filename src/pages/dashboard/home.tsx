import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@app/backend/graphql/queries/UserQuery";
import SkeletonTextPlaceholder from "@app/utils/components/SkeletonTextPlaceholder"
import type { GetUserByEmailInput, TGetUserByEmail, TUser } from "@app/utils/domain/types/User";
import type { UserAuth } from "@app/utils/domain/types/UserSession";
import { Button, Card } from "flowbite-react"
import type { GetStaticPropsContext } from "next"
import { signOut, useSession } from "next-auth/react"
import Router from "next/router";
import { useEffect, useState } from "react"

export default function HomePage() {
    const { status, data } = useSession()
    const [geUserByEmail, result] = useLazyQuery<TGetUserByEmail, GetUserByEmailInput>(GET_USER_BY_EMAIL)
    const [userByEmail, setUserByEmail] = useState<TUser | null>(null)

    useEffect(() => {
        if (status === "unauthenticated") {
            Router.replace(`/${Router.locale}/auth/signin`)
        }
        if (result.data) {
            setUserByEmail(result.data.userByEmail)
        }
    }, [status, result])

    useEffect(() => {
        if (status !== "loading") {
            geUserByEmail({ variables: { email: data?.user?.email ?? "" } })
        }
    }, [geUserByEmail, data, status])
    if (status === "authenticated") {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-24">
                <Card className="max-w-sm">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">This page protected for special people.</h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Id: {userByEmail?.id}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Email: {userByEmail?.email}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Name: {userByEmail?.name}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Role: {userByEmail?.role}</p>
                    <Button onClick={() => {
                        signOut()
                    }}>
                        Logout
                    </Button>
                </Card>
            </div>
        )
    }
    return <SkeletonTextPlaceholder />
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default
        }
    };
}