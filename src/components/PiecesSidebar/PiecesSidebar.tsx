import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Button from '../Button/Button';
import { AppContext } from '../Router/Router';
import PieceCard from '../PieceCard/PieceCard';
import { SidebarContainer, SidebarHeader, SidebarPieceList } from './StyledPiecesSidebar';

const PiecesSidebar = () => {

    const { appState } = useContext(AppContext);
    const [pieces, setPieces] = useState<string[]>([])
    const { piece } = useParams<{ piece: string }>();

    useEffect(() => {
        setPieces(Object.keys(appState.pieces));
    }, [appState.pieces])

    return (
        <SidebarContainer>
            <SidebarHeader>
                <p>Content</p>
                <Button>+ Add</Button>
            </SidebarHeader>
            <SidebarPieceList>
                {pieces.map((pieceName: string) => (
                    <PieceCard key={pieceName} name={pieceName} active={pieceName === piece} />
                ))}
            </SidebarPieceList>
        </SidebarContainer>
    )
};

export default PiecesSidebar;