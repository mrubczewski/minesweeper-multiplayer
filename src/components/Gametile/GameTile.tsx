import styles from './GameTile.module.css'

export default function GameTile() {
    return (
        <div className={styles.tileContainer}>
            <button className={styles.tile}></button>
        </div>
    )
}
