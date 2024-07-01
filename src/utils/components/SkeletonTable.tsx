import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface IProps {
    repeatRow: number;
    repeatColumn: number;
}

export default function SkeletonTable({ repeatColumn, repeatRow }: IProps) {
    let currentColumn: React.ReactNode[] = []
    let currentRow: React.ReactNode[] = []
    for (let index = 0; index < repeatColumn; index++) {
        currentColumn = [...currentColumn, (
            <TableCell key={index}>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </TableCell>
        )]
    }

    for (let index = 0; index < repeatRow; index++) {
        currentRow = [...currentRow, (
            <TableRow key={index}>
                {currentColumn}
            </TableRow>
        )]
    }
    return (
        <>
            {currentRow}
        </>
    )
}