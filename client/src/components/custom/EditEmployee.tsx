import { useState, useEffect } from "react";
import { EditIcon } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Employee } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  emp?: Employee;
  onEditClick: (emp: Employee | null) => void;
};

const EditEmployee: React.FC<Props> = ({ emp, onEditClick }) => {
  const [editEmp, setEditEmp] = useState<Employee | null>(null);

  useEffect(() => {
    if (emp) {
      setEditEmp(emp);
    }
  }, [emp]);
  return (
    <Dialog>
      <DialogTrigger>
        <span className="flex gap-2 !bg-transparent cursor-pointer p-2.5 border rounded-full">
          <EditIcon className="size-4" />
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
              value={editEmp?.name}
              onChange={(e) =>
                editEmp && setEditEmp({ ...editEmp, name: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Position"
              value={editEmp?.position}
              onChange={(e) =>
                editEmp && setEditEmp({ ...editEmp, position: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Hire date"
              value={editEmp?.hireDate}
              onChange={(e) =>
                editEmp && setEditEmp({ ...editEmp, hireDate: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Direct reports"
              value={editEmp?.directReports?.join("")}
              onChange={(e) =>
                editEmp &&
                setEditEmp({
                  ...editEmp,
                  directReports: e.target.value.split("").map(Number),
                })
              }
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={editEmp?.active}
                onCheckedChange={(checked) =>
                  editEmp &&
                  setEditEmp({ ...editEmp, active: Boolean(checked) })
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
            <Button onClick={() => onEditClick(editEmp)}>Edit</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployee;
