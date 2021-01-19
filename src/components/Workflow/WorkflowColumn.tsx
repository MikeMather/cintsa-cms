import { Piece } from '../../types/types'
import { WorkflowColumnContainer, WorkflowColumnHeader } from './StyledWorkflow'
import WorkflowCard from './WorkflowCard';
import { useDrop } from 'react-dnd'

const WorkflowColumn = ({ content, stage, onPostMove }: { content: Piece[], stage: string, onPostMove: Function }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (x) => onDrop(x),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  const onDrop = (piece: any) => {
    onPostMove(piece, stage);
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