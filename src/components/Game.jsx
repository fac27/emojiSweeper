import { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [gameState, setGameState] = useState(
        {
            width: 8,
            height: 8,
            numberOfBombs: 10,
            isGameOver: false,
            isGameWon: false,
            isGameStarted: false,
        });

    return (
    <>
        <Board gameState={gameState} setGameState={setGameState} />
    </>
    );
}