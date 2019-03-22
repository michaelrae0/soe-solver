import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableHighlight } from 'react-native';
import { addSystem } from '../actions/index'

export default class Solver extends React.Component {
  constructor(props) {
    super(props);

    this.state = { // Coefficients. Saved as strings to be used in the TextInputs.
      a1: '2',
      b1: '1',
      t1: '10',
      a2: '4',
      b2: '3',
      t2: '24',
    }
  }

  solveEquations = () => {
    // Solve for x and y.
    let atleastOneZero = (possibleZero, coeff, total, known) => {
      if (possibleZero !== 0) return (total - coeff*known) / possibleZero;
      else return 'Unknown'
    }

    // Convert coefficients from strings to numbers
    let a1 = +this.state.a1;
    let a2 = +this.state.a2;
    let b1 = +this.state.b1;
    let b2 = +this.state.b2;
    let t1 = +this.state.t1;
    let t2 = +this.state.t2;

    // Solve for y, then x.
    let x = 0;
    let y = 0;

    // Invalid inputs.
    if ( this.state.t1 === '' || this.state.t2 === '' ) return "Invalid input"
    else if ( a1 === 0 && a2 === 0 && ( t1/b1 !== t2/b2 || (t1 === 0 && t2 === 0) )) return "Invalid input"
    else if ( b1 === 0 && b2 === 0 && ( t1/a1 !== t2/a2 || (t1 === 0 && t2 === 0) )) return "Invalid input"
    else if ( (a1 === 0 && b1 === 0) || (a2 === 0 && b2 === 0) ) return "Enter two equations"
    else if ( a1 === a2 && b1 === b2 && t1 !== t2 ) return "These equations never cross"


    // Solutions for 1 to 2 zeros.
    if (a1 === 0) {
      y = t1/b1;
      x = atleastOneZero(a2, b2, t2, y);
    }
    else if (a2 === 0) {
      y = t2/b2;
      x = atleastOneZero(a1, b1, t1, y);
    }
    else if (b1 === 0) {
      x = t1/a1;
      y = atleastOneZero(b2, a2, t2, x);
    }
    else if (b2 === 0) {
      x = t2/a2;
      y = atleastOneZero(b1, a1, t1, x);
    }
    // Solution for no zeros.
    else {
      y = (t2 - a2/a1*t1) / (b2 - a2/a1*b1);
      x = (t1 - b1*y)/a1;
    }

    // Round to 4 decimals to save screen space.
    if (typeof x === 'number') x = Math.round(x * 10000)/10000;
    if (typeof y === 'number') y = Math.round(y * 10000)/10000;

    return { x, y }
  }

  onPressClear = () => {
    // Clear the coeffients.
    this.setState({
      a1: '',
      b1: '',
      t1: '',
      a2: '',
      b2: '',
      t2: '',
    });

    // Hide answers/error in Results component
    this.props.toggleAnswers(false);
    this.props.toggleError(false);
  }
  onPressSolve = () => {    
    // Solve for x and y.
    let results = this.solveEquations();

    // Show error in Results if user enter invalid input.
    if (typeof results === 'string') {
      this.props.toggleAnswers(false)
      this.props.toggleError(results);
      return;
    }

    // Update redux state.
    let system = { ...this.state, x: results.x, y: results.y };
    this.props.dispatch(addSystem(system));

    // Show answers in Results component
    this.props.toggleAnswers(true);
  }
  
  render() {
    return (
      <View style={styles.main}>

        {/* Empty space */}
        <View style={styles.buffer}></View>

        {/* Bracket + Equations */}
        <View style={styles.system}>
          {/* Bracket */}
          <View style={styles.bracketContainer} >
            <Image source={require('../../assets/images/bracketSlim.png')}  style={styles.bracket}/>
          </View>

          {/* Equations */}
          <View className='equations' style={styles.equations} >
            {/* 1st Equation */}
            <View style={styles.topRow}>
              <TextInput 
                style={styles.input}
                keyboardType = 'numeric'
                onChangeText={a1 => {
                  if (+a1 >= 1000) return
                  this.setState({a1})
                }}
                value={this.state.a1}
                // placeholder='1'
              ></TextInput>
              <Text style={styles.variables} >x + </Text>
              <TextInput 
                style={styles.input}
                keyboardType = 'numeric'
                onChangeText={b1 => {
                  if (+b1 >= 1000) return
                  this.setState({b1})
                }}
                value={this.state.b1}
                // placeholder='1'
              ></TextInput>
              <Text style={styles.variables} >y = </Text>
              <TextInput 
                style={styles.input}
                keyboardType = 'numeric'
                onChangeText={t1 => {
                  if (+t1 >= 1000) return
                  this.setState({t1})
                }}
                value={this.state.t1}
                // placeholder='1'
              ></TextInput>
            </View>

            {/* 2nd Equation */}
            <View style={styles.bottomRow}>
              <TextInput 
                style={styles.input}
                keyboardType = 'numeric'
                onChangeText={a2 => {
                  if (+a2 >= 1000) return
                  this.setState({a2})
                }}
                value={this.state.a2}
                // placeholder='1'
              ></TextInput>
              <Text style={styles.variables} >x + </Text>
              <TextInput 
                style={styles.input}
                keyboardType = 'numeric'
                onChangeText={b2 => {
                  if (+b2 >= 1000) return
                  this.setState({b2})
                }}
                value={this.state.b2}
                // placeholder='1'
              ></TextInput>
              <Text style={styles.variables} >y = </Text>
              <TextInput 
                style={styles.input}
                keyboardType = 'numeric'
                onChangeText={t2 => {
                  if (+t2 >= 1000) return
                  this.setState({t2})
                }}
                value={this.state.t2}
                // placeholder='1'
              ></TextInput>
            </View>
          </View>
        </View>
        
        {/* Clear and solve buttons */}
        <View style={styles.buttonRow} >
          {/* Clear */}
          <TouchableHighlight onPress={this.onPressClear} underlayColor="white">
            <View style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </View>
          </TouchableHighlight>
          {/* Solve */}
          <TouchableHighlight onPress={this.onPressSolve} underlayColor="white">
            <View style={styles.solveButton}>
              <Text style={styles.solveButtonText}>Solve</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 0.55,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  // Empty space
  buffer: {
    flex: 0.15,
  },  

  // System - contains bracket and eqns.
  system: {
    flexDirection: 'row',
    flex: 0.55,
    alignItems: 'flex-end'

  },

  // Image.
  bracketContainer: {
    flex: 0.15,
  },
  bracket: {
    height: 150,
    left: 15,
  },

  // Equation rows
  equations: {
    flex: 0.82,
    height: 150,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  // TextInput and Text componets.
  variables: {
    fontSize: 30,
  },
  input: {
    height: 35,
    width: 60,
    paddingTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#d5d5d5',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#f1f1f1'
  },

  // Button Row.
  buttonRow: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end'
  },
  // Individual Buttons.
  clearButton: {
    width: 80,
    alignItems: 'center',
  },
  solveButton: {
    width: 90,
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'green',
  },
  clearButtonText: {
    padding: 13,
    color: 'blue',
    fontSize: 20,
  },
  solveButtonText: {
    padding: 10,
    color: 'green',
    fontSize: 25,
  },
});