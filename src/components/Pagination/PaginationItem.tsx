import React from 'react';
import { PaginationItemProps } from "./interface";

export const PaginationItem: React.FC<PaginationItemProps> = (props) => {

  const {
    isCurrent = false,
    number,
    onPageChange
  } = props;

  return (
    <button onClick={() => onPageChange(number)} disabled={isCurrent}>
      {number}
    </button>
  );
};