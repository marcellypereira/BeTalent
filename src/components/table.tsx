import React from 'react';

interface TableProps {
  loading: boolean;
  error: string | null;
}


const Table: React.FC<TableProps> = ({ employees, loading, error }) => {
  if (loading) {
    return <div>Carregando funcionários...</div>;
  }

  if (error) {
    return <div >{error}</div>;
  }

  if (employees.length === 0) {
    return <div>Nenhum funcionário encontrado</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>FOTO</th>
            <th>NOME</th>
            <th>CARGO</th>
            <th>DATA DE ADMISSÃO</th>
            <th>TELEFONE</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Table;