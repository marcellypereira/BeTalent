export interface Employee {
  id: number | string;
  name: string;
  job: string;
  admission_date: string;
  phone: string;
  image: string;
}

export interface EmployeesResponse {
  employees: Employee[];
}