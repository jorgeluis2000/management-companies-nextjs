import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import type { SidebarItems, SidebarProfile } from "@app/utils/domain/interfaces/Sidebar";
import { usePathname } from "next/navigation";
import { FiLogOut, FiMenu, FiMoreHorizontal, FiUser, FiX } from "react-icons/fi";
import SidebarButton from "./SidebarButton";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

interface SidebarMobileProps {
    title: string | React.ReactNode
    sidebarItems: SidebarItems;
    profile: SidebarProfile
}

export default function SidebarMobile(props: SidebarMobileProps) {
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' variant='ghost' className='fixed top-3 left-3'>
                    <FiMenu size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='px-3 py-4'>
                <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
                    <span className='text-lg font-semibold font-sans text-foreground mx-3'>
                        {props.title}
                    </span>
                    <SheetClose asChild>
                    </SheetClose>
                </SheetHeader>
                <div className='h-full'>
                    <div className='mt-5 flex flex-col w-full gap-1'>
                        {props.sidebarItems.links.map((link, idx) => (
                            <Link key={idx.toString()} href={link.href}>
                                <SidebarButton
                                    variant={pathname === link.href ? 'secondary' : 'ghost'}
                                    icon={link.icon}
                                    className='w-full'
                                >
                                    {link.label}
                                </SidebarButton>
                            </Link>
                        ))}
                        {props.sidebarItems.extras}
                    </div>
                    <div className='absolute w-full bottom-4 px-1 left-0'>
                        <Separator className='absolute -top-3 left-0 w-full' />
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant='ghost' className='w-full justify-start'>
                                    <div className='flex justify-between items-center w-full'>
                                        <div className='flex gap-2'>
                                            <Avatar className='h-5 w-5'>
                                                <AvatarImage src={props.profile.href} />
                                                <AvatarFallback>{props.profile.name}</AvatarFallback>
                                            </Avatar>
                                            <span>{props.profile.name}</span>
                                        </div>
                                        <FiMoreHorizontal size={20} />
                                    </div>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className='mb-2 p-2'>
                                {props.profile.options}
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}