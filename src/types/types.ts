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

export interface InitialState {
    pieces: {[key: string]: Piece[]}
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