import { State } from "react-select/src/Select";

export interface Piece {
    layout: string;
    title: string;
    status: string;
    slug: string;
    id?: string;
    [key: string]: any;
}

export interface Settings {
    layout: {
        workflowView: 'rows' | 'columns'
    }
}

export interface AuthState {
    signedIn: boolean,
    username: string
}

export interface StatePieces {
    [key: string]: StatePiece
}

export interface StatePiece {
    schema: PieceSchema,
    items: Piece[]
}

export interface InitialState {
    pieces: StatePieces
    layouts: string[]
    media: string[]
    settings: Settings,
    auth: AuthState
}

export const defaultSettings: Settings = {
    layout: {
        workflowView: 'rows'
    }
}

export type SCHEMA_FIELD_TYPES = 'text' | 'markdown' | 'image' | 'date';

export interface PieceSchemaField {
    id?: string
    label: string
    name: string
    type: SCHEMA_FIELD_TYPES
}

export interface PieceSchema {
    id: string
    label: string
    name: string;
    fields: PieceSchemaField[]
}