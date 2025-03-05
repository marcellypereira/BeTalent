import React from 'react';
import EmployeeForm from '../../form/employeeForm';
import styles from '../../styles/employeeForm.module.css';

const AddEmployee: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <EmployeeForm />
      </div>
    </div>
  );
};

export default AddEmployee;