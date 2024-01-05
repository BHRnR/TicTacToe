import {useState} from "react";

type SquareProps = { value: string | undefined, onSquareClick: () => void }
type History = (string | undefined)[][]
type BoardProps = { xIsNext: boolean, squares: (string | undefined)[], onPlay: (nextSquares: (string | undefined)[]) => void }

function Square({value, onSquareClick}: Readonly<SquareProps>) {
  return <button className="square" onClick={onSquareClick}>
    {value}
  </button>
}

export default function Game() {
  const [history, setHistory] = useState<History>([Array(9).fill(undefined)])
  const [currentMove, setCurrentMove] = useState<number>(0)
  const [historyReversed, setHistoryReversed] = useState<boolean>(true)
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

function Board({xIsNext, squares, onPlay}: Readonly<BoardProps>) {

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    const nextSquares: (string | undefined)[] = squares.slice()

    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const winner: string | undefined = calculateWinner(squares)
  let status: string;
  if (winner)
    status = `Winner: ${winner}`
  else if (!squares.includes(undefined))
    status = 'Draw'
  else
    status = `Next player: ${xIsNext ? 'X' : 'O'}`

  return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
      </div>
  )
}

function calculateWinner(squares: (string | undefined)[]): string | undefined {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const element of lines) {
    const [a, b, c]: number[] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return undefined;
}
