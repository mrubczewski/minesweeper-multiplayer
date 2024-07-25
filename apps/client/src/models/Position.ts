export class Position {
    constructor(
        public x: number,
        public y: number
    ) {}

    isValid(sizeX: number, sizeY: number): boolean {
        if (this.x < 0 || this.y < 0) {
            return false
        }
        return !(this.x > sizeX - 1 || this.y > sizeY - 1)
    }

    isEqual(position2: Position): boolean {
        return this.x === position2.x && this.y === position2.y
    }
}
