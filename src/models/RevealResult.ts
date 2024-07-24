import { TileState } from '@/models/TileState'
import { PlayerStatus } from '@/models/PlayerState'

export class RevealResult {
    status: PlayerStatus
    tilesState: TileState[][]

    constructor(status: PlayerStatus, tilesState: TileState[][]) {
        this.status = status
        this.tilesState = tilesState
    }
}
