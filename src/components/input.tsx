import React from "react";
import styles from "../styles/input.module.css"; 

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="Pesquisar"
        value={value}
        onChange={onChange}
        className={styles.input} 
      />
    </div>
  );
};

export default Input;