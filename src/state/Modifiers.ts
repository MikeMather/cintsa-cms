import { InitialState, Piece } from "../types/types";
import StorageHandler from "./StorageHandler";

export const updatePiece = (state: InitialState, {pieceName, piece}: { pieceName: string, piece: Piece }): InitialState => {
    const newState = { ...state };
    let content = [ ...newState.pieces[pieceName].items ];
    const pieceIndex = content.findIndex((post: Piece) => piece.id === post.id);
    if (pieceIndex === -1) {
        content = [{ ...piece }, ...content];
    }
    else {
        // If piece was published and is moved back into draft/review then delete the rendered file
        if (content[pieceIndex].status === 'published' && piece.status !== 'published') {
            const handler = new StorageHandler();
            handler.deleteRenderedFile(piece.slug);
        }
        content[pieceIndex] = { ...piece };
        
    }
    newState.pieces[pieceName].items = content;
    return newState;
}

export const deletePiece = (state: InitialState, {pieceName, piece}: { pieceName: string, piece: Piece }): InitialState => {
    const newState = { ...state };
    const content = [ ...newState.pieces[pieceName].items ];
    const pieceIndex = content.findIndex((post: Piece) => piece.id === post.id);
    content.splice(pieceIndex, 1);
    newState.pieces[pieceName].items = content;
    return newState;
}