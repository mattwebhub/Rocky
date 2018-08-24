import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { deviceWidth } from "../../../theme/theme";
import Buttons from "../components/Buttons";
import Result from "../components/Result";

export default class PlayContainer extends Component {
  constructor(props) {
    super(props);
    
    // Initialize states
    this.state = {
      userChoice: "",
      computerChoice: "",
      result: "",
      countdown: null
    };
  }

  /** 
   *   JokenPo function 
   * 
   * 
  */

  JokenPo(userChoice) {
    // Reinitialize state
    this.setState({
      result: "",
      userChoice: "",
      computerChoice: "",
    });
    // Initialize variables
    let result = "";
    let computerChoice = "";

    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 3);

    switch (randomNumber) {
      case 0:
        computerChoice = "rock";
        break;
      case 1:
        computerChoice = "paper";
        break;
      case 2:
        computerChoice = "scissors";
        break;
    }
    // Initialize Countdown
    this.setState({
      countdown: 3
    });

    startCountdown = () => {
      this.handleClock = setInterval(() => {
        decrementClock();
      }, 1000);
    };

    decrementClock = () => {
      if (this.state.countdown === 1) clearInterval(this.handleClock);

      this.setState(prevState => ({ countdown: prevState.countdown - 1 }));
      if (this.state.countdown === 0) this.setState({ countdown: null });
    };

    // Start Countdown
    startCountdown();

    // Compare answers
    let compare = function(computerChoice, userChoice) {
      if (computerChoice === userChoice) {
        result = "Fair enough, it's a draw!";
      } else if (computerChoice === "scissors" && userChoice === "paper") {
        result = "Oh, no you lost!";
      } else if (computerChoice === "rock" && userChoice === "scissors") {
        result = "Oh, no you lost!";
      } else if (computerChoice === "paper" && userChoice === "rock") {
        result = "Oh, no you lost!";
      } else {
        result = "Nice, you won!";
      }
    };
    // Call compare function
    compare(computerChoice, userChoice);

    // Set state of result
    this.countdown = setTimeout(() => {
      this.setState({
        userChoice,
        computerChoice,
        result
      });
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top} />
        <View style={styles.bottom}>
          <Result
            computerChoice={this.state.computerChoice}
            userChoice={this.state.userChoice}
            countdown={this.state.countdown}
            result={this.state.result}
          />

          <Buttons
            {...this.props}
            onScissorsPress={() => {
              this.JokenPo("scissors");
            }}
            onPaperPress={() => {
              this.JokenPo("paper");
            }}
            onRockPress={() => {
              this.JokenPo("rock");
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
    backgroundColor: "white"
  },
  top: {
    flex: 1
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  }
});