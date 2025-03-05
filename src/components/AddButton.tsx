import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/buttonAdd.module.css';

interface AddButtonProps {
  onClick?: () => void;
  to?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, to }) => {
  if (to) {
    return (
      <Link to={to} className={styles.addButton}>
        <span className={styles.plusIcon}>+</span>
      </Link>
    );
  }

  return (
    <button className={styles.addButton} onClick={onClick}>
      <span className={styles.plusIcon}>+</span>
    </button>
  );
};

export default AddButton;