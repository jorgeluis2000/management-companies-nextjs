import type { SidebarItems, SidebarProfile } from "@app/utils/domain/interfaces/Sidebar";
import Link from "next/link";
import SidebarButton from "./SidebarButton";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiMoreHorizontal } from "react-icons/fi";
import { useRouter } from "next/router";

interface IProps {
    title: string | React.ReactNode
    sidebarItems: SidebarItems;
    profile: SidebarProfile
}

export default function SidebarDesktop({ title, sidebarItems, profile }: IProps) {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <aside className="w-[260px] max-w-xs h-screen fixed left-0 top-0 z-50 border-r dark:border-slate-300">
            <div className="h-full px-3 py-4">
                <h3 className='mx-3 text-lg font-semibold text-foreground'>{title}</h3>
                <section className="mt-5">
                    <div className='flex flex-col gap-1 w-full'>
                        {sidebarItems.links.map((link, index) => (
                            <a key={index.toString()} href={link.href}>
                                <SidebarButton
                                    variant={pathname === link.href || `/${router.locale}${pathname}` === link.href ? 'secondary' : 'ghost'}
                                    icon={link.icon}
                                    className='w-full'
                                >
                                    {link.label}
                                </SidebarButton>
                            </a>
                        ))}
                        {sidebarItems.extras}
                    </div>
                    <div className='absolute left-0 bottom-3 w-full px-3'>
                        <Separator className='absolute -top-3 left-0 w-full' />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='ghost' className='w-full justify-start'>
                                    <div className='flex justify-between items-center w-full'>
                                        <div className='flex gap-2'>
                                            <Avatar className='h-5 w-5'>
                                                <AvatarImage src={profile.href ?? 'https://github.com/shadcn.png'} />
                                                <AvatarFallback>{profile.name}</AvatarFallback>
                                            </Avatar>
                                            <span>{profile.name}</span>
                                        </div>
                                        <FiMoreHorizontal className="size-5" />
                                    </div>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='mb-2 w-56 p-3 rounded-[1rem]'>
                                {profile.options}
                            </PopoverContent>
                        </Popover>
                    </div>
                </section>
            </div>
        </aside>
    )
}