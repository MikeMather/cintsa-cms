import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Button from '../Button/Button';
import { AppContext } from '../../App';
import PieceCard from '../PieceCard/PieceCard';
import { SidebarContainer, SidebarHeader, SidebarPieceList } from './StyledPiecesSidebar';

import CreatePieceModal from '../Modal/CreatePieceModal';

const PiecesSidebar = (): JSX.Element => {

  const { appState } = useContext(AppContext);
  const [pieces, setPieces] = useState<string[]>([])
  const { piece } = useParams<{ piece: string }>();
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setPieces(Object.keys(appState.pieces));
  }, [appState.pieces])

  const toggleInput = () => {
    setAdding(!adding);
  }

  return (
    <SidebarContainer>
      {adding && <CreatePieceModal onClose={() => setAdding(false)}/>}
      <SidebarHeader>
        <p>Pieces</p>
        <Button onClick={toggleInput}>New</Button>
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