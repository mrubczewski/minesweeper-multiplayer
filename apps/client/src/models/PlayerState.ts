import { GameBoard } from '@/models/GameBoard'
import { TileState } from '@/models/TileState'
import { Position } from '@/models/Position'
import { boardDirections } from '@/constants/boardDirections'
import { RevealResult } from '@/models/RevealResult'

export enum PlayerStatus {
    PLAYING,
    WON,
    LOST,
}

export class PlayerState {
    board: GameBoard
    private tilesState: TileState[][] = []
    private tilesRevealed: number = 0
    private visitedTiles: Position[] = []
    private playerStatus: PlayerStatus = PlayerStatus.PLAYING

    private generateInitialState() {
        for (let y = 0; y < this.board.sizeY(); y++) {
            const rowState: TileState[] = []

            for (let x = 0; x < this.board.sizeX(); x++) {
                rowState.push({ type: 'hidden' })
            }

            this.tilesState.push(rowState)
        }
    }

    private calculatePlayerStatus() {
        if (
            this.board.numberOfTiles - this.board.numberOfMines ===
            this.tilesRevealed
        )
            this.playerStatus = PlayerStatus.WON
        else this.playerStatus = PlayerStatus.PLAYING
    }

    private revealTile(position: Position) {
        if (!position.isValid(this.board.sizeX(), this.board.sizeY())) return
        if (
            this.visitedTiles.find((visitedPosition) =>
                visitedPosition.isEqual(position)
            )
        )
            return

        const boardTileAtPosition = this.board.tiles[position.y][position.x]
        if (boardTileAtPosition.isMine) {
            return
        }

        this.visitedTiles.push(position)
        this.tilesRevealed++

        if (boardTileAtPosition.adjacentMines > 0) {
            this.tilesState[position.y][position.x] = {
                type: 'revealed',
                value: {
                    type: 'emptyAdjacent',
                    numberOfAdjacentMines: boardTileAtPosition.adjacentMines,
                },
            }
            return
        } else {
            this.tilesState[position.y][position.x] = {
                type: 'revealed',
                value: { type: 'empty' },
            }
        }

        for (let i = 0; i < boardDirections.length; i++) {
            const newPosition = new Position(
                position.x + boardDirections[i][1],
                position.y + boardDirections[i][0]
            )
            this.revealTile(newPosition)
        }
    }

    getState(): TileState[][] {
        return this.tilesState
    }

    handleReveal(position: Position): RevealResult {
        const isValidPosition = position.isValid(
            this.board.sizeX(),
            this.board.sizeY()
        )
        if (!isValidPosition) throw new Error('Invalid position!')

        const tileStateAtPosition = this.tilesState[position.y][position.x]
        const boardAtPosition = this.board.tiles[position.y][position.x]

        switch (tileStateAtPosition.type) {
            case 'hidden': {
                if (boardAtPosition.isMine) {
                    this.tilesState[position.y][position.x] = {
                        type: 'revealed',
                        value: { type: 'mine' },
                    }

                    this.playerStatus = PlayerStatus.LOST
                    return new RevealResult(this.playerStatus, this.tilesState)
                } else if (boardAtPosition.adjacentMines > 0) {
                    this.tilesState[position.y][position.x] = {
                        type: 'revealed',
                        value: {
                            type: 'emptyAdjacent',
                            numberOfAdjacentMines:
                                boardAtPosition.adjacentMines,
                        },
                    }

                    this.tilesRevealed++
                } else {
                    this.revealTile(position)
                }
                break
            }
            case 'revealed': {
                throw new Error('Tile already revealed!')
            }
        }

        this.calculatePlayerStatus()
        return new RevealResult(this.playerStatus, this.tilesState)
    }

    constructor(board: GameBoard) {
        this.board = board
        this.generateInitialState()
    }
}
