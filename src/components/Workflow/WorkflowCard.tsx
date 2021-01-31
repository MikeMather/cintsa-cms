import { Piece } from '../../types/types';
import React from 'react';
import { WorkflowCardContainer } from './StyledWorkflow';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd'
import { format } from 'date-fns';

const WorkflowCard = ({ piece }: { piece: Piece }): JSX.Element => {
  const [collectedProps, drag] = useDrag({
    item: { type: 'card', piece }
  });

  return (
    <Link to={`/admin/pieces/${piece.slug}`} ref={drag}>
      <WorkflowCardContainer>
        <h4>{piece.title}</h4>
        <small>{format(piece.date, 'y-MM-dd')}</small>
      </WorkflowCardContainer>
    </Link>
  )
}

export default WorkflowCard;