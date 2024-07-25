'use client'

import styles from './page.module.css'
import GameBoardView from '@/components/GameBoard/GameBoard'
import { GameBoard } from '@/models/GameBoard'
import { PlayerState, PlayerStatus } from '@/models/PlayerState'
import { Position } from '@/models/Position'
import { TileState } from '@/models/TileState'
import React from 'react'

export default function Home() {
    const [gameBoard, setGameBoard] = React.useState(new GameBoard(15, 15, 10))
    gameBoard.log()

    const [playerState, setPlayerState] = React.useState(
        new PlayerState(gameBoard)
    )

    const [gameState, setGameState] = React.useState<TileState[][]>(
        playerState.getState()
    )

    const [playerStatus, setPlayerStatus] = React.useState(PlayerStatus.PLAYING)

    function handleReveal(posX: number, posY: number) {
        const result = playerState.handleReveal(new Position(posX, posY))
        setGameState(result.tilesState.map((row) => [...row]))
        setPlayerStatus(result.status)
    }

    return (
        <main className={styles.main}>
            <p>Minesweeper</p>
            <p>{playerStatus}</p>
            <div className={styles.actionContainer}>
                <button className={styles.actionButton}>Find Opponent</button>
                <button className={styles.actionButton}>Create a game</button>
            </div>
            <div>
                <GameBoardView
                    tilesState={gameState}
                    revealTile={handleReveal}
                ></GameBoardView>
            </div>
        </main>
    )
}
