import {useState} from "react";
import Board from "./Board";

type History = (string | undefined)[][]

export default function Game() {
  const [history, setHistory] = useState<History>([Array(9).fill(undefined)])
  const [currentMove, setCurrentMove] = useState<number>(0)
  const [historyReversed, setHistoryReversed] = useState<boolean>(false)
  const currentSquares: (string | undefined)[] = history[currentMove]
  const xIsNext: boolean = currentMove % 2 === 0


  function handlePlay(nextSquares: (string | undefined)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  function reverseHistory() {
    setHistoryReversed(!historyReversed)
  }

  const moves = history.map((squares: (string | undefined)[], move: number) => {
    let description;
    if (move === history.length - 1) {
      description = `You are at move ${move}`
    } else if (move > 0) {
      description = `Go to move ${move}`
    } else {
      description = `Go to game start`
    }

    return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
    )
  })

  if (historyReversed) moves.reverse()

  return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
          <button onClick={reverseHistory}>Change History Direction</button>
          <ul>{moves}</ul>
        </div>
      </div>
  )
}
