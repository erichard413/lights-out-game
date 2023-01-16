import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import {v4 as uuidv4} from 'uuid';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=6, ncols=3, chanceLightStartsOn=.30 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    let rows = [...Array(nrows).keys()]
    let cols = [...Array(ncols).keys()]
    // TODO: create array-of-arrays of true/false values
    rows.map(r=> {
      let newRow = cols.map(c => Math.random() > chanceLightStartsOn ? true : false);
      initialBoard.push(newRow);
    })
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let string = JSON.stringify(board)
    return string.includes('false') ? false : true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = oldBoard.map(r => [...r]);
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y+1, x, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y, x+1, newBoard);
      flipCell(y, x-1, newBoard);

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return (
      <div>
        <h1>GAME IS OVER. YOU HAVE WON.</h1>
      </div>
    )
  }
  // make table board

  // TODO   

  return (
    <table className="Board">
      <tbody>
        {board.map((r, rIdx) => (
        <tr key={uuidv4()}>
          {r.map((c, cIdx) => 
          <Cell key={uuidv4()} flipCellsAroundMe={()=> flipCellsAround(`${rIdx}-${cIdx}`)} isLit={c}/>
          )}
        </tr>
        ))}
      </tbody>
      
    </table>
  )
}

export default Board;
