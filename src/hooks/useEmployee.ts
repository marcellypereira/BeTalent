import { useState, useEffect } from 'react';
import { Employee } from '../types/employee';
import { getEmployees } from '../services/api';

export const useEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const data = await getEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
        setError(null);
      } catch (err) {
        console.error('Erro completo:', err);
        setError('Erro ao carregar funcionários');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEmployees(employees);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(term) ||
        employee.job.toLowerCase().includes(term) ||
        employee.phone.includes(term)
    );

    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const addEmployee = (newEmployee: Employee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  }; 

  return {
    employees: filteredEmployees,
    loading,
    error,
    searchTerm,
    handleSearch,
    addEmployee,

  };
}