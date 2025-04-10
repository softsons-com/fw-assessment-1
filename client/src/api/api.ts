import { Employee } from "@/lib/types";

export const fetchEmployees = async () : Promise<Employee[]> => {
    const response = await fetch("/api/v1/employees");

    if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      return response.json();
}

