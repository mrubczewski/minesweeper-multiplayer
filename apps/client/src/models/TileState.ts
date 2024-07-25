export type RevealedTileValue =
    | { type: 'mine' }
    | { type: 'empty' }
    | { type: 'emptyAdjacent'; numberOfAdjacentMines: number }

export type TileState =
    | { type: 'hidden' }
    | { type: 'revealed'; value: RevealedTileValue }
