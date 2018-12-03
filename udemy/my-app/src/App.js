import React, { Component } from 'react';
import './App.css';

import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Tony', age: 33 },
      { name: 'Manny', age: 28 },
      { name: 'Sally', age: 30 }
    ]
  }

  nameSwitchHandler = () => {
    this.setState({
      persons: [
        { name: 'Anthony', age: 33 },
        { name: 'Manny', age: 28 },
        { name: 'Sally', age: 26 }
      ]
    })
  }

  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Anthony', age: 33 },
        { name: event.target.value, age: 28 },
        { name: 'Sally', age: 26 }
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <p> hello</p>
        <button onClick={this.nameSwitchHandler}>Switch Name</button>
        <Person 
        click={this.nameSwitchHandler} 
        name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}
        changed={this.nameChangeHandler}
        >My Hobbies are being awesome </Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
      </div>
    );
  }
}

export default App;
