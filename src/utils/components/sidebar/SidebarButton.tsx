import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarButtonProps extends ButtonProps {
    icon?: React.ReactNode;
}

export default function SidebarButton({ icon, className, children, ...props }: SidebarButtonProps) {
    return (
        <Button
            variant='ghost'
            className={cn('gap-2 justify-start', className)}
            {...props}
        >
            {icon}
            <span>{children}</span>
        </Button>
    );
}