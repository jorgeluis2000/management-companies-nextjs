import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@apollo/client";
import DialogUpdate from "@app/utils/components/DialogUpdate";
import DashboardLayout from "@app/utils/components/layouts/DashboardLayout";
import SheetAddUser from "@app/utils/components/SheetAddUser";
import SkeletonTable from "@app/utils/components/SkeletonTable";
import type {
  TCurrentCountUsers,
  TListUser,
  TUser,
} from "@app/utils/domain/types/user/User";
import type { ListUserParams } from "@app/utils/domain/types/user/UserParams";
import { COUNT_USER, LIST_USERS } from "@app/utils/queries/UserQuery";
import { maxPagesList } from "@app/utils/services/ListServer";
import { format } from "@formkit/tempo";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiArrowDownCircle, FiMoreHorizontal, FiUsers } from "react-icons/fi";
import { useReadLocalStorage } from "usehooks-ts";
import FormShowUser from "./components/FormShowUser";
import FormUpdateUser from "./components/FormUpdateUser";

export default function CommunityPage() {
  const limitRows = 25;
  const admin = "border-sky-500 text-teal-700 bg-sky-200/50";
  const normalUser = "border-teal-500 text-teal-700 bg-teal-200/50";
  const timezone = useReadLocalStorage<string>("timezone");
  const t = useTranslations("Community");

  const [users, setUsers] = useState<TUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState<number>(0);

  const {
    error: _listUserError,
    loading: listUserLoading,
    data: listUser,
  } = useQuery<TListUser, ListUserParams>(LIST_USERS, {
    variables: {
      limit: limitRows,
      page: currentPage,
    },
  });

  const {
    error: _countUsersError,
    loading: countUsersLoading,
    data: countUsers,
  } = useQuery<TCurrentCountUsers>(COUNT_USER);

  async function eventHandlerShowMore() {
    setCurrentPage((beforePage) => beforePage + 1);
  }

  useEffect(() => {
    if (listUser) {
      setUsers((prev) => [...prev, ...listUser.users]);
    }
  }, [listUser]);

  useEffect(() => {
    if (countUsers) {
      setCount(maxPagesList(countUsers.countUsers, limitRows));
    }
  }, [countUsers]);

  return (
    <DashboardLayout className="space-y-5">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cardUser.title")}
            </CardTitle>
            <FiUsers className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {countUsersLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {countUsers?.countUsers}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("cardUser.extra")}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:gap-8 lg:grid-cols-1">
        <Card className="md:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>{t("tableUser.title")}</CardTitle>
              <CardDescription>{t("tableUser.summary")}</CardDescription>
            </div>
            <SheetAddUser
              title={t("sheetAddUser.title")}
              description={t("sheetAddUser.description")}
            />
          </CardHeader>
          <CardContent>
            <Table className="overflow-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>{t("tableUser.columns.user")}</TableHead>
                  <TableHead className="">
                    {t("tableUser.columns.role")}
                  </TableHead>
                  <TableHead className="">
                    {t("tableUser.columns.phone")}
                  </TableHead>
                  <TableHead className="">
                    {t("tableUser.columns.date")}
                  </TableHead>
                  <TableHead className="text-right hidden">
                    {t("tableUser.columns.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listUserLoading ? (
                  <SkeletonTable repeatColumn={5} repeatRow={5} />
                ) : (
                  users.map((user, key) => (
                    <TableRow key={key.toString()}>
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell className="table-cell">
                        <Badge
                          className={`text-xs ${user.role === "ADMIN" ? admin : normalUser}`}
                          variant="outline"
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="table-cell">{user.phone}</TableCell>
                      <TableCell className="table-cell">
                        {format({
                          date: user.createdAt,
                          format: "DD/MM/YYYY hh:mm a",
                          tz: timezone ?? "America/Bogota",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant={"ghost"}>
                              <FiMoreHorizontal size={20} />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem]">
                            <div className="space-y-1">
                              <DialogUpdate
                                closeButton="Cancel"
                                description="Aquí se actualiza el usuario"
                                nameButton="Actualizar"
                                title={"Actualizar Usuario"}
                              >
                                <FormUpdateUser user={user} />
                              </DialogUpdate>
                              <DialogUpdate
                                closeButton={t("dialogShowUser.btnCancel")}
                                description={t("dialogShowUser.description")}
                                nameButton={t("dialogShowUser.btnShow")}
                                title={t("dialogShowUser.title")}
                              >
                                <FormShowUser user={user} timezone={timezone} />
                              </DialogUpdate>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              {count > currentPage ? (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center w-full">
                      <Button className="gap-2" onClick={eventHandlerShowMore}>
                        {t("tableUser.showMore")}
                        <FiArrowDownCircle size={20} />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              ) : (
                <></>
              )}
            </Table>
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
