/**
 * 24 Mini games hidden behind 6x4 windows.
 */

// tslint:disable: no-magic-numbers
import React from "react"
import background from './background.webp'
import Random from '../random'
import Touchable from "tfw/view/touchable"
import castInteger from 'tfw/converter/integer'
import GoodLevelOfBeerView from "../game/good-level-of-beer"

import "./App.css"

interface IAppProps {
    className?: string
}
interface IAppState {
    day: number
    page: number
}

const DAYS_BEFORE_CHRISTMAS = 24

export default class App extends React.Component<IAppProps, IAppState> {
    state = {
        day: 0,
        page: 0
    }

    componentDidMount() {
        const img = new Image()
        img.src = `${background}`
        img.onload = () => {
            removeSplashScreen()
            window.setTimeout(this.getCurrentDate, 1200)
        }
        this.handleHashChange()
        window.addEventListener('hashchange', this.handleHashChange)
    }

    private readonly handleHashChange = () => {
        const hash = window.location.hash.substr(1)
        const page = castInteger(hash, 0)
        this.setState({ page })
    }

    private readonly getCurrentDate = () => {
        this.setState({ day: 7 })
    }

    renderDay(day: number) {
        const curtainAnimationTime = dice(2, 1)
        const curtainAnimationDelay = dice(0.5, 0.5)
        const open = day <= this.state.day

        return <Touchable
            enabled={open}
            onClick={() => goTo(day)}
            key={`day-${day}`}
            className={open ? "open" : "closed"}
        >
            <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox="-60 -60 120 120"
            >
                <defs>
                    <clipPath id="circle">
                        <circle cx="0" cy="0" r="30" />
                    </clipPath>
                </defs>
                <g stroke="#000" strokeWidth="2">
                    <circle cx="0" cy="0" r="40" fill="#964" />
                    <circle
                        style={{
                            animation: `light-animation-${day % 3} ${5 + 2 * Math.random()
                                }s infinite`
                        }}
                        cx="0" cy="0" r="30"
                    />
                    <path
                        fill="#964"
                        clip-path="url(#circle)"
                        d="M3,-35 V-10 Q3,-3,10,-3 H35 V3 H10 Q3,3,3,10 V35 H-3 V10 Q-3,3,-10,3 H-35 V-3 H-10 Q-3,-3,-3,-10 V-35 Z"
                    />
                    <circle cx="0" cy="0" r="30" fill="none" />
                </g>
            </svg>
            <svg preserveAspectRatio="xMidYMid meet" viewBox="-60 -60 120 120" className="curtain">
                <g stroke="#000" fill="#643" strokeWidth="2">
                    {
                        createRange(-2, +2).map(v => {
                            const r = 42
                            const y = r * v / 3
                            const x = Math.sqrt(r * r - y * y)
                            return <g
                                key={`bar${v}`}
                                className={`bar-${2 + v}`}
                                style={{
                                    transitionDuration: `${curtainAnimationTime}s`,
                                    transitionDelay: `${curtainAnimationDelay}s`
                                }}>
                                <path
                                    transform={`rotate(${dice(0, 10)},0,${y})`}
                                    d={`M${dice(-x, 3)
                                        },${y - 4
                                        } C${-x / 3
                                        },${dice(y - 4, 3)
                                        },${x / 3
                                        },${dice(y - 4, 3)
                                        },${dice(x, 3)
                                        },${y - 4
                                        } Q${dice(x, 3)
                                        },${y
                                        },${dice(x, 3)
                                        },${y + 5
                                        } C${x / 3
                                        },${dice(y + 5, 3)
                                        },${-x / 3
                                        },${dice(y + 5, 3)
                                        },${dice(-x, 3)
                                        },${y + 5
                                        } Q${dice(-x, 3)
                                        },${y
                                        },${dice(-x, 3)
                                        },${y - 4
                                        }Z`}
                                />
                            </g>
                        })
                    }
                </g>
            </svg>
            <div className="day">{day}</div>
        </Touchable>
    }

    private readonly handleBack = () => {
        this.setState({ page: 0 })
    }

    render() {
        g_random.reset("Tolokoban")
        const classes = ['App']
        if (this.props.className) classes.push(this.props.className)
        const range = createRange(1, DAYS_BEFORE_CHRISTMAS)
        const { day, page } = this.state
        const game = page > day ? 0 : page

        return (<div className={classes.join(' ')}>
            {
                game === 1 && <GoodLevelOfBeerView />
            }
            <section className={`calendar ${game > 0 ? "hide" : ""}`}>
                {
                    range.map(day => this.renderDay(day))
                }
            </section>
        </div>)
    }
}


function createRange(min: number, max: number): number[] {
    const out: number[] = []
    for (let value = min; value <= max; value++) {
        out.push(value)
    }

    return out
}


function removeSplashScreen() {
    const splash = document.getElementById('SPLASH')
    if (splash) {
        splash.classList.add("hide")
        const VANISHING_TIME = 1000
        window.setTimeout(
            () => {
                const parent = splash.parentNode
                if (parent) parent.removeChild(splash)
            },
            VANISHING_TIME
        )
    }
}


const g_random = new Random()

function dice(center: number, radius: number): number {
    return g_random.about(center, radius)
}


function goTo(day: number) {
    window.setTimeout(
        () => {
            window.location.hash = `#${day}`
        },
        300
    )
}