import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;