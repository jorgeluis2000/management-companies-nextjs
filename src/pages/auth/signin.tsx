import type { GetStaticPropsContext, NextPage } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { HiOutlineArrowRight, HiHome } from "react-icons/hi";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { HRText } from "@app/utils/components/HR";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

export default function SignIn(props: NextPage) {
    const t = useTranslations('SignIn');
    const router = useRouter()
    const [userInfo, setUserInfo] = useState({ email: "", password: "" })
    return (
        <div className="flex flex-col space-y-6 min-h-screen items-center justify-center p-24">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Login</h5>
            <Card className="lg:min-w-96 max-w-md">
                <CardHeader>
                    
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={async (e) => {
                        e.preventDefault()
                        const response = await signIn('credentials', {
                            email: userInfo.email,
                            password: userInfo.password,
                            redirect: false
                        })
                        if (response?.ok) {
                            router.push(`/${router.locale}/dashboard/home`)
                        } else {
                            alert(response?.error)
                        }

                    }}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="emailSignIn" >
                                    {t('labelEmail')}
                                </Label>
                            </div>
                            <Input id="emailSignIn" type="email" value={userInfo.email} onChange={({ target }) => {
                                setUserInfo({ ...userInfo, email: target.value })
                            }} placeholder="name@email.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="passwordSignIn">
                                    {t('labelPassword')}
                                </Label>
                            </div>
                            <Input id="passwordSignIn" type="password" value={userInfo.password} onChange={({ target }) => {
                                setUserInfo({ ...userInfo, password: target.value })
                            }} placeholder="••••••••" required />
                        </div>
                        <Button type="submit">{t('btnSignIn')}
                            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <HRText text={t('hr')} />
                        <Button variant="outline" type="button" onClick={() => {
                            router.replace(`/${router.locale}`)
                        }}>{t('btnGoBack')}
                            <HiHome className="ml-2 h-5 w-5" /></Button>
                    </form>
                </CardContent>
            </Card>
        </div>)

}


export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default
        }
    };
}