import * as React from "react"
import Icon from 'tfw/view/icon'
import Touchable from 'tfw/view/touchable'
import Translation from 'tfw/intl'

import './game-view.css'

const _ = Translation.make(require('./game-view.yaml'))

export interface IGameViewProps {
    className?: string
    id: string
    children: JSX.Element
}

// tslint:disable-next-line: no-empty-interface
interface IGameViewState { }

export default class GameView extends React.Component<IGameViewProps, IGameViewState> {
    state: IGameViewState = {}

    private readonly handleHelp = () => {
        const { id } = this.props

    }

    render() {
        const { className, id, children } = this.props
        const classNames = ['custom', 'view-GameView']
        if (typeof className === 'string') {
            classNames.push(className)
        }

        return <div className={classNames.join(" ")}>
            <header className="thm-bgPD thm-ele-header">
                <Touchable
                    className="back-button thm-bgP"
                    onClick={() => window.location.hash = "#"}
                >
                    <Icon content="back" size="1.3em" />
                </Touchable>
                <div>{_(id)}</div>
                <Touchable
                    className="help-button thm-bgS"
                    onClick={this.handleHelp}
                >
                    <Icon content="help" size="1.3em" />
                </Touchable>
            </header>
            {children}
        </div>
    }
}
