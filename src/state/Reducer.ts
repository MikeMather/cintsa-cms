import { Piece, InitialState } from "../types/types";
import { deletePiece, updatePiece } from "./Modifiers";

export const STATE_SET = 'SET_STATE';
export const PIECE_UPDATED = 'PIECE_UPDATED';
export const PIECE_TYPE_ADDED = 'PIECE_TYPE_ADDED';
export const PIECE_DELETED = 'PIECE_DELETED';

export const Reducer = (state: InitialState, action: { type: string, payload: any}): InitialState => {
  switch (action.type) {
    case STATE_SET:
      return action.payload;
    case PIECE_UPDATED:
      return updatePiece(state, action.payload);
    case PIECE_DELETED:
      return deletePiece(state, action.payload);
    case PIECE_TYPE_ADDED:
      return {
        ...state,
        pieces: {
          ...state.pieces,
          [action.payload.pieceName]: []
        }
      };
  }
  return state;
};