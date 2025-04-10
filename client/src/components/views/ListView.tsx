`use client`;
import { FC, use } from "react";
import { CheckIcon, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchEmployees } from "@/api/api";
import { Employee } from "@/lib/types";
import CreateEmployee from "@/components/custom/CreateEmployee";
import EditEmployee from "@/components/custom/EditEmployee";
import DeleteEmployee from "@/components/custom/DeleteEmployee";

type Props = {
  name?: string;
};

export const EmployeeState: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className="flex items-center gap-2">
      {active ? (
        <CheckIcon className="text-green-600 size-4" />
      ) : (
        <X className="text-red-600 size-4" />
      )}
    </div>
  );
};

const employeePromise = fetchEmployees();
export const ListView: FC<Props> = ({}) => {
  const employees = use(employeePromise);
  const tableHeaders = ["Name", "Position", "Hire Date", "Active", "Actions"];

  const handleEmployeeDelete = (emp: Employee) => {
    console.log("DELETE EMPLOYEE ===>>>", emp);
  };

  const handleEmployeeEdit = (editEmp: Employee | null) => {
    console.log("EDIT EMPLOYEE ===>>>", editEmp);
  };

  const handleEmployeeCreate = (emp: Employee | null) => {
    console.log("CREATE EMPLOYEE ===>>>", emp);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex gap-4 items-center justify-between">
        <h1 className="text-4xl font-semibold">Employees</h1>
        <CreateEmployee onCreateClick={handleEmployeeCreate} />
      </div>
      <Table className="w-full md:table-fixed overflow-x-auto">
        <TableCaption>A list of recent employees.</TableCaption>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header} className="whitespace-nowrap">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell className="whitespace-nowrap flex flex-col gap-2">
                {emp.name}
                {emp.directReports && emp.directReports.length > 0 && (
                  <div className="flex items-center gap-2 pb-4">
                    <p>Reports to:</p>
                    <p>{emp.directReports}</p>
                  </div>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {emp.position}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {emp.hireDate}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <EmployeeState active={emp.active} />
              </TableCell>
              <TableCell className="whitespace-nowrap space-x-4">
                <EditEmployee
                  emp={emp}
                  onEditClick={(editEmp) => handleEmployeeEdit(editEmp)}
                />
                <DeleteEmployee
                  onDeleteClick={() => handleEmployeeDelete(emp)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
