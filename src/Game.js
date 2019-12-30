import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  render() {
    return (
      <>
        <h1>Light's Out</h1>
        <p>Clicking each square will turn itself and the lights adjacent on or off, depending on their previous state. Try to get every light off in the square to win!</p>
        <Board />
      </>
    );
  }
}

export default Game;
