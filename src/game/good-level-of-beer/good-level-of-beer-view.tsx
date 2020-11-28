import * as React from "react"
import Tfw from 'tfw'

import './good-level-of-beer-view.css'

// const _ = Tfw.Intl.make(require('./good-level-of-beer-view.json'))

export interface IGoodLevelOfBeerViewProps {
    className?: string
}

// tslint:disable-next-line: no-empty-interface
interface IGoodLevelOfBeerViewState {}

export default class GoodLevelOfBeerView extends React.Component<IGoodLevelOfBeerViewProps, IGoodLevelOfBeerViewState> {
    state: IGoodLevelOfBeerViewState = {}

    render() {
        const classNames = ['custom', 'game-GoodLevelOfBeerView']
        if (typeof this.props.className === 'string') {
            classNames.push(this.props.className)
        }

        return <div className={classNames.join(" ")}>
        </div>
    }
}
