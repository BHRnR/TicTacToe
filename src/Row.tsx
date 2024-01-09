import Square from "./Square";
import {Winner} from "./Board";

type RowProps = { rowIndex: number, winner: Winner | undefined, squares: (string | undefined)[], handleClick: (squareIndex: number) => void }

export default function Row({rowIndex, winner, squares, handleClick}: RowProps) {
  return Array(3).fill(undefined).map((_, colIndex) => {
        const squareIndex = rowIndex * 3 + colIndex
        if (winner && winner.squares.includes(squareIndex)) {
          return <Square key={colIndex} value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} winningSquare={true}/>
        } else {
          return <Square key={colIndex}  value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} winningSquare={false}/>
        }
      }
  )
}
