import { Piece, InitialState } from "../types/types";
import { deletePiece, updatePiece } from "./Modifiers";

export const STATE_SET = 'SET_STATE';
export const PIECE_UPDATED = 'PIECE_UPDATED';
export const PIECE_TYPE_ADDED = 'PIECE_TYPE_ADDED';
export const PIECE_DELETED = 'PIECE_DELETED';
export const MEDIA_ADDED = 'MEDIA_ADDED';
export const MEDIA_DELETED = 'MEDIA_DELETED';
export const SETTINGS_UPDATED = 'SETTINGS_UPDATED';
export const AUTH_STATE_UPDATED = 'AUTH_STATE_UPDATED';

export const Reducer = (state: InitialState, action: { type: string, payload: any}): InitialState => {
  switch (action.type) {
    case STATE_SET:
      return action.payload;
    case AUTH_STATE_UPDATED:
      return {
        ...state,
        auth: action.payload
      }
    case PIECE_UPDATED:
      return updatePiece(state, action.payload);
    case PIECE_DELETED:
      return deletePiece(state, action.payload);
    case PIECE_TYPE_ADDED:
      return {
        ...state,
        pieces: {
          ...state.pieces,
          [action.payload.schema.name]: {
            schema: action.payload.schema.name,
            items: []
          }
        }
      };
    case MEDIA_ADDED:
      return {
        ...state,
        media: [ ...state.media, action.payload.name ]
      }
    case MEDIA_DELETED:
      return {
        ...state,
        media: state.media.filter((media: string) => media !== action.payload)
      }
    case SETTINGS_UPDATED:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      }
  }
  return state;
};