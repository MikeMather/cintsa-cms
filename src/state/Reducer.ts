import { Piece, InitialState } from "../types/types";
import { updatePiece } from "./Modifiers";

export const STATE_SET = 'SET_STATE';
export const PIECE_UPDATED = 'PIECE_UPDATED';

export const Reducer = (state: InitialState, action: { type: string, payload: any}): InitialState => {
  switch (action.type) {
    case STATE_SET:
      return action.payload;
    case PIECE_UPDATED:
      const newState = updatePiece(state, action.payload);
      return newState;
  }
  return state;
};