import axios from 'axios';
import { Employee } from '../types/employee';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await api.get<Employee[]>('/employees');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
};

export const addEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee | null> => {
  try {
    const employeeWithFlag = {
      ...employee,
      isAddedManually: true
    };
    
    const response = await api.post<Employee>('/employees', employeeWithFlag);
    return response.data;
  } catch (error) {
    console.error('Error adding employee:', error);
    return null;
  }
};

export const deleteEmployee = async (id: string | number): Promise<boolean> => {
  try {
    const response = await api.delete(`/employees/${id}`);
    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error('Error deleting employee:', error);
    return false;
  }
};

export default api;