import React, { ReactNode } from 'react'
import GameTile from '@/components/Gametile/GameTile'
import styles from './GameBoard.module.css'

interface Props {
    sizeX: number
    sizeY: number
}

export default function GameBoardView({ sizeX, sizeY }: Props): ReactNode {
    const boardSizeStyle = {
        '--rows': sizeY,
        '--columns': sizeX,
    }

    const board: ReactNode[][] = []

    for (let y = 0; y < sizeY; y++) {
        const boardRow: ReactNode[] = []
        for (let x = 0; x < sizeX; x++) {
            boardRow.push(<GameTile key={`${x}${y}`}></GameTile>)
        }
        board.push(boardRow)
    }

    return (
        <div className={styles.boardWrapper} style={boardSizeStyle}>
            {board}
        </div>
    )
}
