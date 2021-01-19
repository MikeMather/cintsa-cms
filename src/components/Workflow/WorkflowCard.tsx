import { Piece } from '../../types/types';
import { WorkflowCardContainer } from './StyledWorkflow';
import { ReactComponent as PaperIcon } from '../../icons/paper.svg';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd'

const WorkflowCard = ({ piece }: { piece: Piece }) => {
    
    const [collectedProps, drag] = useDrag({
        item: { type: 'card', piece }
      });

    return (
        <Link to={`/admin/content/${piece.slug}`} ref={drag}>
            <WorkflowCardContainer>
                <PaperIcon />
                {piece.title}
            </WorkflowCardContainer>
        </Link>
    )
}

export default WorkflowCard;