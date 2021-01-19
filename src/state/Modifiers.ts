import { InitialState, Piece } from "../types/types";
import StorageHandler from '../state/StorageHandler';
import cogoToast from 'cogo-toast';

export const updatePiece = (state: InitialState, {pieceName, piece}: { pieceName: string, piece: Piece }): InitialState => {
    const newState = { ...state };
    const content = [ ...newState.pieces[pieceName] ];
    const pieceIndex = content.findIndex((post: Piece) => piece.id === post.id);
    content[pieceIndex] = { ...piece };
    newState.pieces[pieceName] = content;
    const handler = new StorageHandler();
    handler.savePiece(piece).then(() => {
        cogoToast.success(`${pieceName} updated`);
    });
    return newState;
}