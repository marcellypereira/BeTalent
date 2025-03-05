import React from 'react';
import { Link } from 'react-router-dom';

interface AddButtonProps {
  onClick?: () => void;
  to?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, to }) => {
  if (to) {
    return (
      <Link to={to}>
        <span>+</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick}>
      <span>+</span>
    </button>
  );
};

export default AddButton;