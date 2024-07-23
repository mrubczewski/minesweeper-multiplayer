import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            <p>Minesweeper</p>
            <div className={styles.actionContainer}>
                <button className={styles.actionButton}>Find Opponent</button>
                <button className={styles.actionButton}>Create a game</button>
            </div>
        </main>
    )
}
