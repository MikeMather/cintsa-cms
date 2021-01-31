import React from 'react';
import { Link } from 'react-router-dom';
import FolderIcon from '../../icons/folder.svg';
import { PieceCardContaier } from './StyledPieceCard';

const PieceCard = ({ name, active }: { name: string, active: boolean }): JSX.Element => (
  <Link to={`/admin/pieces/${name}`}>
    <PieceCardContaier active={active} >
      <FolderIcon />
      { name }
    </PieceCardContaier>
  </Link>
)

export default PieceCard;