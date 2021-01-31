import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Button from '../Button/Button';
import { AppContext } from '../Router/Router';
import PieceCard from '../PieceCard/PieceCard';
import { SidebarContainer, SidebarHeader, SidebarPieceList } from './StyledPiecesSidebar';
import { PIECE_TYPE_ADDED } from '../../state/Reducer';
import Loading from '../Loading/Loading';

const PiecesSidebar = (): JSX.Element => {

    const { appState, dispatch } = useContext(AppContext);
    const [pieces, setPieces] = useState<string[]>([])
    const { piece } = useParams<{ piece: string }>();
    const [adding, setAdding] = useState(false);
    const [newPiece, setNewPiece] = useState('');

    useEffect(() => {
        setPieces(Object.keys(appState.pieces));
    }, [appState.pieces])

    const toggleInput = () => {
        setAdding(!adding);
    }

    const updateNewPiece = (e: ChangeEvent<HTMLInputElement>): void => {
        const name = e.target.value.toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-');
        setNewPiece(name);
    };

    const addPiece = () => {
        dispatch({
            type: PIECE_TYPE_ADDED,
            payload: {
                pieceName: newPiece
            }
        });
        toggleInput();
    };

    return (
        <SidebarContainer>
            <SidebarHeader>
                {!adding
                ? <>
                    <p>Pieces</p>
                    <Button onClick={toggleInput}>New</Button>
                </>
                : <>
                    <input placeholder="Posts, Pages" onChange={updateNewPiece} />
                    <Button onClick={addPiece}>Add</Button>
                </>}
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