import Square from "./Square"

type BoardProps = { xIsNext: boolean, squares: (string | undefined)[], onPlay: (nextSquares: (string | undefined)[]) => void }
type Winner = { winner: string | undefined, squares: (number | undefined)[] }

export default function Board({xIsNext, squares, onPlay}: Readonly<BoardProps>) {
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

  function row(rowIndex: number) {
    return Array(3).fill(undefined).map((_, colIndex) => {
      const squareIndex = rowIndex * 3 + colIndex
      if (winner && winner.squares.includes(squareIndex)) {
        return <Square value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} winningSquare={true}/>
      }
      return <Square value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} winningSquare={false}/>
    })
  }

  const board = Array(3).fill(undefined).map((_, rowIndex) => {
    return <div className="board-row">
      {(row(rowIndex))}
    </div>

  })

  return (
      <div>
        <div className="status">{status}</div>
        {board}
      </div>
  )
}
