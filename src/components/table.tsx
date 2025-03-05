import React from 'react';
import { Employee } from '../types/employee';
import TableRow from './tableRow';
import styles from '../styles/table.module.css';

interface TableProps {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const Table: React.FC<TableProps> = ({ employees, loading, error }) => {
  if (loading) {
    return <div className={styles.loading}>Carregando funcionários...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (employees.length === 0) {
    return <div className={styles.empty}>Nenhum funcionário encontrado</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.photoHeader}>FOTO</th>
            <th className={styles.nameHeader}>NOME</th>
            <th className={styles.jobHeader}>CARGO</th>
            <th className={styles.dateHeader}>DATA DE ADMISSÃO</th>
            <th className={styles.phoneHeader}>TELEFONE</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <TableRow 
              key={employee.id} 
              employee={employee} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;