export interface IGlass {
    // Level max.
    capacity: number
    // Current level.
    current: number
    // Level to reach to win.
    target: number
}

export interface IGame {
    glasses: IGlass[]
    // It can be solved with only this number of steps.
    minSteps: number

}