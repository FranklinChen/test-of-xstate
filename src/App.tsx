import React from "react";
import { useMachine } from "@xstate/react";
import "./App.css";
import { Spool, Stop, Play } from "./controls";
import {
    machine,
    TapePlayerContext,
    TapePlayerEvent,
    EventId,
    AvailableStates
} from "./TapePlayerMachine";

const App: React.FC<{}> = () => {
    const [current, send] =
        useMachine<TapePlayerContext, TapePlayerEvent>(machine);

    const mayNotSend = (event: EventId) =>
        current.nextEvents.findIndex(v => v === event) === -1;

    const isCurrentState = (availableState: AvailableStates) =>
        availableState === current.value;

    const backwardClick = () => {
        send({ type: "REWIND" });
    };

    const forwardClick = () => {
        send({ type: "FORWARD" });
    };

    const playClick = () => {
        send({ type: "PLAY" });
    };

    const stopClick = () => {
        send({ type: "STOP" });
    };

    return (
        <div className="app">
            <div className="controls">
                <Spool
                    role="backward"
                    disabled={mayNotSend("REWIND")}
                    active={isCurrentState("rewinding")}
                    onClick={backwardClick}
                />
                <Stop
                    disabled={mayNotSend("STOP")}
                    active={isCurrentState("stopped")}
                    onClick={stopClick}
                />
                <Play
                    disabled={mayNotSend("PLAY")}
                    active={isCurrentState("playing")}
                    onClick={playClick}
                />
                <Spool
                    role="forward"
                    disabled={mayNotSend("FORWARD")}
                    active={isCurrentState("forwarding")}
                    onClick={forwardClick}
                />
            </div>
            <div className="state">{current.value}</div>
            <div className="tape-position">{current.context.pos}</div>
        </div>
    );
}

export default App;
