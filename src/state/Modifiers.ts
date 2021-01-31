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
    cogoToast.loading('Saving piece...').then(() => {
        handler.savePiece(piece).then(() => {
            cogoToast.success(`Piece updated`);
        }).catch(() => {
            cogoToast.error(`Couldn't save piece`)
        });
    });
    return newState;
}

export const deletePiece = (state: InitialState, {pieceName, piece}: { pieceName: string, piece: Piece }): InitialState => {
    const newState = { ...state };
    const content = [ ...newState.pieces[pieceName] ];
    const pieceIndex = content.findIndex((post: Piece) => piece.id === post.id);
    content.splice(pieceIndex, 1);
    newState.pieces[pieceName] = content;
    const handler = new StorageHandler();
    cogoToast.loading(`Deleting piece`).then(() => {
        handler.deletePiece(piece).then(() => {
            cogoToast.success(`Piece deleted`);
        }).catch(() => {
            cogoToast.error(`Couldn't delete piece`);
        });
    });
    return newState;
}