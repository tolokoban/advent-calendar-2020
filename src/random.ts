import SeedRandom from 'seed-random'


export default class Random {
    private generator = SeedRandom("Tolokoban")

    reset(seed: string) {
        this.generator = SeedRandom(seed)
    }

    /**
     * Return a random number between `center - radius` and `center + radius`.
     */
    about(center: number, radius: number): number {
        const rnd = this.generator()
        return center + (rnd + rnd - 1) * radius
    }

    /**
     * Return an integer number between `min` and `max`.
     */
    pickInRange(min: number, max: number): number {
        return Math.floor(min) + (Math.ceil(max - min) * this.generator())
    }
}