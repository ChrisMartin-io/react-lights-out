import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


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
 * - hasWon: boolean, true when board is all off
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

class Board extends Component {

  static defaultProps = {
    nrows: 3,
    ncols: 3,
    chanceLightStartsOn: .5
  }

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      board: this.createBoard(),
      hasWon: false
    }
    this.flipCellsAroundMe = this.flipCellsAroundMe.bind(this);
    // this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    // TODO: create array-of-arrays of true/false values
    let board = [[false, false, false], [true, true, false], [false, false, false]];
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAroundMe(coord) {
    // console.log(coord);
    // console.log('help', this)
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x-1);
    flipCell(y, x+1);
    flipCell(y-1, x);
    flipCell(y+1, x);


    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({board});
  }


  /** Render game board or winning message. */

  render() {
    let displayBoard = [];

    for (let i = 0; i < this.props.ncols; i++) {
      let row = [];
      
      for (let j = 0; j < this.props.nrows; j++) {
        row.push( <Cell value={`${i}-${j}`} key={`${i}-${j}`} isLit={this.state.board[i][j]} flipCellsAroundMe={this.flipCellsAroundMe} />);

      }

      displayBoard.push(<tr key={i}>{ row }</tr>);

    }
    
    let hasWon = true; 

    for (let i = 0; i < displayBoard.length; i++) {
      for (let k = 0; k < displayBoard[i].props.children.length; k++) {
        if (displayBoard[i].props.children[k].props.isLit) {
          hasWon = false;
        }
      }
    }
    
    if (hasWon === true) {
      displayBoard = ["You won!"];
      displayBoard.toString();
    }
    // console.log(displayBoard)

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
    return (
      <div>
        <table>
          <tbody>
            { displayBoard }
          </tbody>
        </table>
      </div>
    )
  }
}


export default Board;