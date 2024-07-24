import styles from './page.module.css'
import GameBoardView from '@/components/GameBoard/GameBoard'
import { GameBoard } from '@/models/GameBoard'

export default function Home() {
    const gameBoard = new GameBoard(10, 10, 10)
    gameBoard.log()

    return (
        <main className={styles.main}>
            <p>Minesweeper</p>
            <div className={styles.actionContainer}>
                <button className={styles.actionButton}>Find Opponent</button>
                <button className={styles.actionButton}>Create a game</button>
            </div>
            <div>
                <GameBoardView sizeX={10} sizeY={10}></GameBoardView>
            </div>
        </main>
    )
}
