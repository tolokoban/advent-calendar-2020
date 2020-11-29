/**
 * 24 Mini games hidden behind 6x4 windows.
 */
import React from "react";
import "./App.css";
interface IAppProps {
    className?: string;
}
interface IAppState {
    day: number;
    page: number;
}
export default class App extends React.Component<IAppProps, IAppState> {
    state: {
        day: number;
        page: number;
    };
    componentDidMount(): void;
    private readonly getCurrentDate;
    renderDay(day: number): JSX.Element;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=App.d.ts.map