import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TableSkeleton = () => {
  const tableHeaders = [
    "Name",
    "Position",
    "Hire Date",
    "Direct Reports",
    "Active",
  ];

  return (
    <Table>
      <TableCaption>Loading employees...</TableCaption>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            {[...Array(5)].map((_, j) => (
              <TableCell key={j}>
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
