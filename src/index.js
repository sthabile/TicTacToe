import React from "react";
import ReactDom from "react-dom";
import './index.css';

/**
 * Square is an example of a controlled component ,it does not maintain state.
 * The Board has full controll over what Square renders.
 * **/
// class Square extends React.Component {
//     //Removed the constructor because Square no longer keeps track of the state.
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         value: null,
//     //     }
//     // }

//     //Render returns the view. This is what will be displayed on the browser
//     render() {
//       return (
//         <button 
//          className="square" 
//          onClick ={() => this.props.onClick()}
//         >
//           {this.props.value}
//         </button>
//       );
//     }
//   }

  /**
   * Square can be written as a function component as it only renders what is passed from Board
   */
  function Square(props){
      return(
          <button
            className="square"
            onClick={props.onClick}
          >
            {props.value}
          </button>
      )
  }
  
  //We can write 
  class Board extends React.Component {

    constructor(props) {
        super(props);
        
        //Think of state as a arrayList of variables
        this.state = {
            squares: Array(9).fill(null),  //State of each square. X , O or null
            isNext: true,  //For taking turns
        }
    }
    
    handleClick(i){
        const squares = this.state.squares.slice();

        if(calculateWinner(squares) || squares[i])
        {
            return;
        }

        squares[i] = this.state.isNext ? 'X':'O';
        this.setState ({
            squares: squares,
            isNext : !this.state.isNext,
        });
    }

    renderSquare(i) {
      return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)}/>;
    }
  
    render() {
      let status;  
      const winner = calculateWinner(this.state.squares);

      if(winner){
          status = 'Winner: ' + winner;
      }
      else{
        status = 'Next player: ' + (this.state.isNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDom.render(
    <Game />,
    document.getElementById('root')
  );
  

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }