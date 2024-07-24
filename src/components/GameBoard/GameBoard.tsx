import React, { ReactNode } from 'react'
import GameTile from '@/components/Gametile/GameTile'
import styles from './GameBoard.module.css'
import { TileState } from '@/models/TileState'

interface Props {
    tilesState: TileState[][]
    revealTile: (posX: number, posY: number) => void
}

export default function GameBoardView({
    tilesState,
    revealTile,
}: Props): ReactNode {
    console.log(tilesState)

    const boardSizeStyle = {
        '--rows': tilesState.length,
        '--columns': tilesState[0].length,
    }

    const board: ReactNode[][] = []

    for (let y = 0; y < tilesState.length; y++) {
        const boardRow: ReactNode[] = []
        for (let x = 0; x < tilesState[0].length; x++) {
            boardRow.push(
                <GameTile
                    key={`${x}${y}`}
                    state={tilesState[y][x]}
                    onClick={() => {
                        revealTile(x, y)
                    }}
                ></GameTile>
            )
        }
        board.push(boardRow)
    }

    return (
        <div className={styles.boardWrapper} style={boardSizeStyle}>
            {board}
        </div>
    )
}
