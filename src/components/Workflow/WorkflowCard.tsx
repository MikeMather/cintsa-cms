import { Piece } from '../../types/types';
import React from 'react';
import { WorkflowCardContainer } from './StyledWorkflow';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd'

const WorkflowCard = ({ piece, layout }: { piece: Piece, layout: 'rows' | 'columns' }): JSX.Element => {
  
  const [collectedProps, drag] = useDrag({
    item: { type: 'card', piece }
  });

  const statusColors: {[key: string]: string} = {
    draft: 'danger',
    review: 'warning',
    published: 'success'
  };

  return (
    <Link to={`/admin/pieces/${piece.slug}`} ref={drag}>
      <WorkflowCardContainer statusColor={statusColors[piece.status]}>
        <div>
          <h4>{piece.title}</h4>
          {/* <small>{format(new Date(piece.date), 'LLL d, y')}</small> */}
        </div>
        {layout === 'rows' && <p>{ piece.status }</p>}
      </WorkflowCardContainer>
    </Link>
  )
}

export default WorkflowCard;