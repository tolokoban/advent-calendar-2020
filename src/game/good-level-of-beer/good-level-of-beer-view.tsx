import * as React from "react"
import GameView from '../../view/game'
import StagesManager from './glob-stages'
import { IGame, IGlass } from './types'
import Storage from 'tfw/storage'
import Calc from 'tfw/calc'
import castInteger from 'tfw/converter/integer'

import './good-level-of-beer-view.css'

// const _ = Tfw.Intl.make(require('./good-level-of-beer-view.json'))

const LocalStorage = new Storage.PrefixedLocalStorage("good-level-of-beer")

export interface IGoodLevelOfBeerViewProps {
    className?: string
}

// tslint:disable-next-line: no-empty-interface
interface IGoodLevelOfBeerViewState {
    game?: IGame
    level: number
}

export default class GoodLevelOfBeerView extends React.Component<IGoodLevelOfBeerViewProps, IGoodLevelOfBeerViewState> {
    state: IGoodLevelOfBeerViewState = {
        level: 0
    }

    async componentDidMount() {
        const LEVEL_MAX = 16
        const level = Calc.clamp(
            castInteger(LocalStorage.get("level", "1"), 1),
            1,
            LEVEL_MAX
        )
        await this.loadGame(level)
    }

    private async loadGame(level: number) {
        const game = await StagesManager.pickGameFromLevel(level)
        this.setState({ level, game })
    }

    private renderLoading() {
        return "<p>Loading...</p>"
    }

    private readonly renderGlass = (glass: IGlass, index: number) => {
        const yCap = 12 - glass.capacity
        const yCur = 12 - glass.current

        return <div className="class-column">
            <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox="-6 0 12 13"
            >
                <rect
                    stroke="none"
                    fill="#fc5"
                    x="-2" y={yCur}
                    width="4" height={glass.capacity}
                />
                <path
                    fill="#000"
                    stroke="none"
                    d={`M-3,12.25 H3 C3,11.5,2.25,11.5,2.25,10.75 V${yCap
                        } C2.25,${yCap - 0.25
                        },1.75,${yCap - 0.25
                        },1.75,${yCap
                        } V11.75 H-1.75 V${yCap
                        } C-1.75,${yCap - 0.25
                        },-2.25,${yCap - 0.25
                        },-2.25,${yCap
                        } V10.75 C-2.25,11.5,-3,11.5,-3,12.25`}
                />
            </svg>
        </div>
    }

    render() {
        const { game } = this.state
        if (!game) return this.renderLoading()

        const classNames = ['custom', 'game-GoodLevelOfBeerView']
        if (typeof this.props.className === 'string') {
            classNames.push(this.props.className)
        }

        return <GameView
            id="good-level-of-beer"
        >
            <div className={classNames.join(" ")}>
                <div className="glasses">
                    {
                        game.glasses.map(this.renderGlass)
                    }
                </div>
            </div>
        </GameView>
    }
}
