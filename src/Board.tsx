import Row from "./Row";

type BoardProps = { xIsNext: boolean, squares: (string | undefined)[], onPlay: (nextSquares: (string | undefined)[]) => void }
export type Winner = { winner: string | undefined, squares: (number | undefined)[] }

function calculateWinner(squares: (string | undefined)[]): Winner | undefined {
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
      return {winner: squares[a], squares: element};
    }
  }
  return undefined;
}

export default function Board({xIsNext, squares, onPlay}: Readonly<BoardProps>) {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares))
      return

    const nextSquares: (string | undefined)[] = squares.slice()

    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)

  let status: string;
  if (winner)
    status = `Winner: ${winner.winner}!`
  else if (!squares.includes(undefined))
    status = 'Draw...'
  else
    status = `Next player: ${xIsNext ? 'X' : 'O'}`

  const board = Array(3).fill(undefined).map((_, rowIndex) => {
    return <div className="board-row" key={rowIndex}>
      {Row({rowIndex, winner, squares, handleClick,})}
    </div>
  })

  return (
      <div>
        <div className="status">{status}</div>
        {board}
      </div>
  )
}
