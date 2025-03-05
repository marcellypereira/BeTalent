import React from 'react';
import Header from '../components/header';
import Input from '../components/input';
import Table from '../components/table';
import AddButton from '../components/AddButton';
import { useEmployee } from '../hooks/useEmployee';
import styles from '../styles/home.module.css';

const Home: React.FC = () => {
  const { 
    employees, 
    loading, 
    error, 
    searchTerm,
    handleSearch
  } = useEmployee();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };
  
  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.content}>
        <div className={styles.topSection}>
          <h1 className={styles.title}>Funcionários</h1>
          
          <div className={styles.actionContainer}>
            <AddButton to="/add-employee" />
            <Input 
              value={searchTerm} 
              onChange={handleInputChange} 
            />
          </div>
        </div>
        
        <Table 
          employees={employees} 
          loading={loading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default Home;