import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@app/utils/queries/UserQuery";
import SkeletonTextPlaceholder from "@app/utils/components/SkeletonTextPlaceholder";
import type { TGetUserByEmail, TUser } from "@app/utils/domain/types/user/User";
import type { GetUserByEmailParams } from "@app/utils/domain/types/user/UserParams";
import type { GetStaticPropsContext } from "next";
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { status, data } = useSession();
  const [geUserByEmail, result] = useLazyQuery<
    TGetUserByEmail,
    GetUserByEmailParams
  >(GET_USER_BY_EMAIL);
  const [userByEmail, setUserByEmail] = useState<TUser | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace(`/${Router.locale}/auth/signin`);
    }
  }, [status]);

  useEffect(() => {
    if (result.data) {
      setUserByEmail(result.data.userByEmail);
    }
  }, [result]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (status !== "loading") {
      geUserByEmail({ variables: { email: data?.user?.email ?? "" } });
    }
  }, [status]);
  if (status === "authenticated") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <Card className="max-w-sm">
          <CardHeader>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              This page protected for special people.
            </h2>
          </CardHeader>
          <CardContent>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Id: {userByEmail?.id}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Email: {userByEmail?.email}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Name: {userByEmail?.name}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Role: {userByEmail?.role}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return <SkeletonTextPlaceholder />;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
