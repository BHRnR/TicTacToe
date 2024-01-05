type SquareProps = { value: string | undefined, onSquareClick: () => void, winningSquare: boolean }

export default function Square({value, onSquareClick, winningSquare}: Readonly<SquareProps>) {
  const className: string = winningSquare ? "winningSquare" : "square"
  return <button className={className} onClick={onSquareClick}> {value} </button>
}
