import React from 'react';
import { Piece } from '../../types/types'
import { WorkflowColumnContainer, WorkflowColumnHeader } from './StyledWorkflow'
import WorkflowCard from './WorkflowCard';
import { useDrop } from 'react-dnd'

interface Props {
  content: Piece[];
  stage: string;
  onPostMove: { 
    (event: { piece: Piece }, moveTo: string): void 
  }
}

const WorkflowColumn = ({ content, stage, onPostMove }: Props): JSX.Element => {
  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (x: any) => onDrop(x),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  const onDrop = (event: { piece: Piece }) => {
    onPostMove(event, stage);
  }
    
  const stageColors: {[key: string]: string} = {
    draft: 'danger',
    review: 'warning',
    published: 'success'
  };

  return (
    <WorkflowColumnContainer ref={drop} cardHovering={isOver}>
      <WorkflowColumnHeader color={stageColors[stage]}>{stage}</WorkflowColumnHeader>
      {content.map((piece: Piece) => (
        <WorkflowCard piece={piece} key={piece.slug} />
      ))}
    </WorkflowColumnContainer>
  )
}

export default WorkflowColumn;