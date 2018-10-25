// eslint-disable-next-line
import React, { component } from "react";
import Square from "./components/square";
import "./App.css";
import Princess from "./princess.json";
// import NavBar from '.components/NavBar';

import "./components/square.css";
// import "tachyons";
const shuffleArray = (array) => {
  let counter = array.length;
  // while there are elements in the array
  while (counter > 0){
    // pick a random index
    let index = Math.floor(Math.random() * counter);
    // decrease counter by one
    counter--;
    // and swap the last element with it
    let temp = array[counter];
    array[counter]=array[index];
    array[index] = temp;
  }
  return array;
};

class App extends component {
  state = {
    currentScore: 0,
    topScore: 0,
    result: "",
    clicked: [],
    gameOver: false,
    Princess
  };

  // when page loads and components mounts,
  // display starting message
componentDidMount(){
  this.setState({result: "Click a princess to get started"})
}

// when a princess gets clicked
// increase points and add id of element to array
clickedPrincess = (id) => {
  console.log(`princess clicked with id: ${id}`);
  if(!this.state.clicked.includes(id)){
    this.pointIncrease();
    this.state.clicked.push(id);
    this.setState({
      gameOver: false
    });
  }
  else{
    this.resetGame();
  }
}

// when the user makes a new click, increment the point by one
// and check if user wins
pointIncrease = () => {
  let score = this.state.currentScore + 1;
  console.log(` score is ${score}`);
  if(score === this.state.Princess.length){
  this.setState({
  result: "you win! Start clicking to play again",
  topScore: score,
  currentScore: 0, 
  clicked: [],
  Princess,
  gameOver: false
  });
  }else if(score > this.state.topScore){
    this.setState({
      topScore: score,
      currentScore: score,
      result: "Correct! New high score!",
  });
  }
 else
  {
  this.setState({
    currentScore: score,
    result: "Correct!"
  });
}
  this.resetPrincessArray();
  
}
// reset the game when user chooses a duplicate
resetGame = () => {
  this.setState({
    points: 0,
      currentScore:0,
      topScore: this.state.topScore,
      result: "You Loss!",
      clicked: [],
      Princess,
      gameOver: true
  });
  console.log('Game Over? ', this.state.gameOver);
  this.resetPrincessArray();
}

// set the array to be mapped to a new scrambled version using shuffle algorithm
resetPrincessArray = () => {
  let newScramble = shuffleArray(Princess);
    this.setState({Princess: newScramble})
}
render() {
  return (
    <div className='container'>

      {/* <NavBar topScore={this.state.topScore} currentScore={this.state.currentScore} status={this.state.result}/> */}
      
      <div className='mainStyle'>
      {this.state.Princess.map(princess => (
      <Square
        id={princess.id}
        image={princess.image}
        clickedPrincess={this.clickedPrincess}
      />
      ))}
      </div>
    </div>
  );
}
}

export default App;