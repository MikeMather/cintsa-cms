export interface Piece {
    name: string;
    layout: string;
    title: string;
    status: string;
    slug: string;
    id?: string;
    [key: string]: any;
}

export interface InitialState {
    pieces: {[key: string]: Piece[]}
    layouts: string[]
};