import { InitialState, Piece } from "../types/types";
import { v4 as uuid } from 'uuid';

export const updatePiece = (state: InitialState, {pieceName, piece}: { pieceName: string, piece: Piece }): InitialState => {
    const newState = { ...state };
    let content = [ ...newState.pieces[pieceName] ];
    const pieceIndex = content.findIndex((post: Piece) => piece.id === post.id);
    if (pieceIndex === -1) {
        content = [{ ...piece, id: uuid()}, ...content];
    }
    else {
        content[pieceIndex] = { ...piece };
    }
    newState.pieces[pieceName] = content;
    return newState;
}

export const deletePiece = (state: InitialState, {pieceName, piece}: { pieceName: string, piece: Piece }): InitialState => {
    const newState = { ...state };
    const content = [ ...newState.pieces[pieceName] ];
    const pieceIndex = content.findIndex((post: Piece) => piece.id === post.id);
    content.splice(pieceIndex, 1);
    newState.pieces[pieceName] = content;
    return newState;
}