import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as FolderIcon } from '../../icons/folder.svg';


export const PieceCardContaier = styled.div<{ active: boolean }>`
    box-shadow: ${props => props.theme.boxShadows.card};
    box-sizing: border-box;
    cursor: point;
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: ${props => props.theme.spacing.md};
    text-decoration: none;
    color: ${props => props.theme.colors[props.active ? 'main' : 'black']};
    font-weight: bold;
    text-transform: capitalize;
    border-radius: 4px;

    svg {
        width: 25px;
        margin-right: ${props => props.theme.spacing.md};

        path {
          fill: ${props => props.theme.colors[props.active ? 'main' : 'black']};
        }
    }

    &:hover {
        color: ${props => props.theme.colors.main};

        svg path {
            fill: ${props => props.theme.colors.main};
        }
    }
`;

const PieceCard = ({ name, active }: { name: string, active: boolean }) => {
  return (
    <Link to={`/admin/content/${name}`}>
      <PieceCardContaier active={active} >
        <FolderIcon />
        { name }
      </PieceCardContaier>
    </Link>
  )
}

export default PieceCard;