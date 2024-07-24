import shuffleArray from '@/utils/shuffleArray'
import { boardDirections } from '@/constants/boardDirections'
import { GameTile } from '@/models/GameTile'
import { Position } from '@/models/Position'

export class GameBoard {
    tiles: GameTile[][] = []

    sizeX() {
        return this.tiles[0]?.length || 0
    }
    sizeY() {
        return this.tiles.length
    }

    private generateBoard(sizeX: number, sizeY: number) {
        const gameTiles: GameTile[][] = []

        for (let y = 0; y < sizeY; y++) {
            const tilesRow: GameTile[] = []

            for (let x = 0; x < sizeX; x++) {
                tilesRow.push(new GameTile())
            }

            gameTiles.push(tilesRow)
        }
        this.tiles = gameTiles
    }

    private placeMines(numberOfMines: number) {
        const minesPosition: Position[] = []

        for (let y = 0; y < this.sizeY(); y++) {
            for (let x = 0; x < this.sizeX(); x++) {
                minesPosition.push(new Position(x, y))
            }
        }

        shuffleArray(minesPosition)

        for (let i = 0; i < numberOfMines; i++) {
            const minePosition = minesPosition[i]
            this.tiles[minePosition.y][minePosition.x].isMine = true
        }
    }

    private calculateAdjacentMines() {
        for (let y = 0; y < this.sizeY(); y++) {
            for (let x = 0; x < this.sizeX(); x++) {
                const tile = this.tiles[y][x]
                if (!tile || tile.isMine) continue

                let adjacentMinesCount = 0
                for (let i = 0; i < boardDirections.length; i++) {
                    const tileToCheckY = y + boardDirections[i][1]
                    const tileToCheckX = x + boardDirections[i][0]

                    if (tileToCheckX < 0 || tileToCheckY < 0) continue
                    if (
                        tileToCheckX >= this.sizeX() ||
                        tileToCheckY >= this.sizeY()
                    )
                        continue

                    const tileToCheck =
                        this.tiles[y + boardDirections[i][1]][
                            x + boardDirections[i][0]
                        ]

                    if (tileToCheck && tileToCheck.isMine) adjacentMinesCount++
                }

                tile.adjacentMines = adjacentMinesCount
            }
        }
    }

    log() {
        let boardLog = ''

        for (let y = 0; y < this.sizeY(); y++) {
            let logRow = ''
            for (let x = 0; x < this.sizeX(); x++) {
                const tile = this.tiles[y][x]
                if (tile.isMine) logRow += 'X'
                else logRow += tile.adjacentMines

                logRow += ' '
            }
            boardLog += logRow + '\n'
        }
        console.log(boardLog)
    }

    constructor(sizeX: number, sizeY: number, numberOfMines: number) {
        this.generateBoard(sizeX, sizeY)
        this.placeMines(numberOfMines)
        this.calculateAdjacentMines()
    }
}
