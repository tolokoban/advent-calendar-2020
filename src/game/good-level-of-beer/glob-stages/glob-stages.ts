import Calc from 'tfw/calc'
import Random from '../../../random'
import StagesURL from './glob-stages.txt'
import { IGlass, IGame } from '../types'

const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
// tslint:disable-next-line: no-magic-numbers
const STAGES: number[] = [0, 168, 280, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1570, 1637]


export default {
    pickGameFromLevel
}


async function pickGameFromLevel(level: number): Promise<IGame> {
    const idx = Calc.clamp(Math.floor(level), 0, STAGES.length - 1 - 1)
    const rnd = new Random()
    rnd.reset(`${Math.random()}${Date.now()}`)
    const gameIndex = rnd.pickInRange(STAGES[idx], STAGES[idx + 1] - 1)

    return await getGame(gameIndex)
}

async function getGame(gameIndex: number): Promise<IGame> {
    const [capH, capL, minSteps, targetH, targetL] = await getGameCode(gameIndex)

    const valueCapacity = capH * ALPHABET.length + capL
    const valueTarget = targetH * ALPHABET.length + targetL
    const capacities = parseDigits(valueCapacity)
    const targets = parseDigits(valueTarget)

    return {
        glasses: capacities.map((capacity: number, idx: number) => ({
            capacity,
            current: capacity,
            target: targets[idx]
        })),
        minSteps
    }
}

/**
 * `value` is a number between 0 and 999 (included).
 * We explode it into 3 digits.
 */
function parseDigits(value: number): [number, number, number] {
    let v = value
    const BASE = 10
    const digit0 = v % BASE
    v = Math.floor((v - digit0) / BASE)
    const digit1 = v % BASE
    v = Math.floor((v - digit0) / BASE)
    const digit2 = v % BASE

    return [digit0, digit1, digit2]
}


// We keep the game codes here when they are loaded.
let g_gameCodes: string | null = null

/**
 * Return 5 numbers describing the game of index gameIndex.
 */
async function getGameCode(gameIndex: number): Promise<number[]> {
    if (g_gameCodes === null) {
        const response = await fetch(StagesURL as string)
        g_gameCodes = await response.text()
    }

    const CODE_SIZE = 5
    const code = g_gameCodes.substr(gameIndex * CODE_SIZE, CODE_SIZE)
    const out: number[] = []
    for (const char of code) {
        const value = ALPHABET.indexOf(char)
        out.push(value)
    }

    return out
}