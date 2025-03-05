import React, { useState } from 'react';
import { Employee } from '../types/employee';
import { formatPhone, formatAdmissionDate } from '../utils/ format';
import styles from '../styles/tableRow.module.css';
import vector1 from '../assets/icons/vector1.svg';
import vector2 from '../assets/icons/vector2.svg';

interface TableRowProps {
  employee: Employee;
}

const TableRow: React.FC<TableRowProps> = ({ employee }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  return (
    <>
      <tr className={`${styles.tableRow} ${expanded ? styles.borderRemoved : ''}`}>
        <td className={styles.imageCell}>
          <img 
            src={employee.image} 
            alt={`${employee.name}'s avatar`} 
            className={styles.employeeImage}
          />
        </td>
        <td className={styles.nameCell}>
          {employee.name}
          <button 
            className={styles.expandButton} 
            onClick={toggleExpand}
            aria-label={expanded ? "Esconder detalhes" : "Mostrar detalhes"}
          >
             <img 
              src={expanded ? vector1 : vector2} 
              alt={expanded ? "Seta para cima" : "Seta para baixo"} 
              className={styles.chevronIcon}
            />
          </button>
        </td>
        <td className={styles.jobCell}>{employee.job}</td>
        <td className={styles.dateCell}>{formatAdmissionDate(employee.admission_date)}</td>
        <td className={styles.phoneCell}>{formatPhone(employee.phone)}</td>
      </tr>

      <tr className={`${styles.expandedRow} ${expanded ? styles.visible : ''}`}>
        <td colSpan={5}>
          <div className={styles.expandedContent}>
            <div className={styles.expandedItem}>
              <span className={styles.expandedLabel}>Cargo</span>
              <span className={styles.expandedValue}>{employee.job}</span>
            </div>
            <div className={styles.expandedItem}>
              <span className={styles.expandedLabel}>Data de admissão</span>
              <span className={styles.expandedValue}>{formatAdmissionDate(employee.admission_date)}</span>
            </div>
            <div className={styles.expandedItem}>
              <span className={styles.expandedLabel}>Telefone</span>
              <span className={styles.expandedValue}>{formatPhone(employee.phone)}</span>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
