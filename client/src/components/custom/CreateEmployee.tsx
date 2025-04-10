import { useState } from "react";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Employee } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  onCreateClick: (emp: Employee | null) => void;
};

const CreateEmployee: React.FC<Props> = ({ onCreateClick }) => {
  const [emp, setEmp] = useState<Employee | null>(null);
  return (
    <Dialog>
      <DialogTrigger className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 px-3 py-2 rounded-lg">
        <span className="flex gap-2 !bg-transparent cursor-pointer items-center">
          <PlusIcon className="size-4" />
          Create employee
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit employee</DialogTitle>
          <DialogDescription>Edit the employee details</DialogDescription>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Name"
              value={emp?.name}
              onChange={(e) => emp && setEmp({ ...emp, name: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Position"
              value={emp?.position}
              onChange={(e) =>
                emp && setEmp({ ...emp, position: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Hire date"
              value={emp?.hireDate}
              onChange={(e) =>
                emp && setEmp({ ...emp, hireDate: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Direct reports"
              value={emp?.directReports?.join("")}
              onChange={(e) =>
                emp &&
                setEmp({
                  ...emp,
                  directReports: e.target.value.split("").map(Number),
                })
              }
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={emp?.active}
                onCheckedChange={(checked) =>
                  emp && setEmp({ ...emp, active: Boolean(checked) })
                }
              />
              <label
                htmlFor="active"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is employee active?
              </label>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => onCreateClick(emp)}>Create</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmployee;
