import styles from './GameTile.module.css'
import { TileState } from '@/models/TileState'
import { ReactNode } from 'react'

interface Props {
    state: TileState
    onClick: () => void
}

export default function GameTile({ state, onClick }: Props) {
    let tileElement: ReactNode

    console.log(state, 'tile state')

    switch (state.type) {
        case 'hidden': {
            tileElement = (
                <button className={styles.tile} onClick={onClick}></button>
            )
            break
        }
        case 'revealed': {
            switch (state.value.type) {
                case 'empty': {
                    tileElement = <div></div>
                    break
                }
                case 'mine': {
                    tileElement = <div>X</div>
                    break
                }
                case 'emptyAdjacent': {
                    tileElement = <div>{state.value.numberOfAdjacentMines}</div>
                }
            }
        }
    }

    return <div className={styles.tileContainer}>{tileElement}</div>
}
