import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableHighlight } from 'react-native';
import { addSystem } from '../actions/index'

export default class Solver extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // Coefficients. 
      a1: '2',
      b1: '1',
      t1: '10',
      a2: '4',
      b2: '3',
      t2: '24',
    }
  }

  // Solves x and y.
  solveEquations = () => {
    let a1 = +this.state.a1;
    let a2 = +this.state.a2;
    let b1 = +this.state.b1;
    let b2 = +this.state.b2;
    let t1 = +this.state.t1;
    let t2 = +this.state.t2;

    let x = 0;
    let y = 0;

    y = (t2 - a2/a1*t1) / (b2 - a2/a1*b1);
    x = (t1 - b1*y)/a1;

    x = Math.round(x * 10000)/10000;
    y = Math.round(y * 10000)/10000;

    return { x, y }
  }

  // Clear empties TextInputs. Solve finds x and y, then updates store.
  onPressClear = () => {
    this.setState({
      a1: '',
      b1: '',
      t1: '',
      a2: '',
      b2: '',
      t2: '',
    })
  }
  onPressSolve = () => {    
    let results = this.solveEquations();

    let action = { ...this.state, x: results.x, y: results.y };
    this.props.dispatch(addSystem(action))
  }
  
  render() {
    return (
      <View style={styles.main}>

        <View style={styles.buffer}></View>
        {/* Bracket + Equations */}
        <View style={styles.system}>
          {/* Bracket */}
          <View style={styles.bracketContainer} >
            <Image source={require('../../assets/bracketSlim.png')}  style={styles.bracket}/>
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
                placeholder='1'
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
                placeholder='1'
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
                placeholder='1'
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
                placeholder='1'
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
                placeholder='1'
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
                placeholder='1'
              ></TextInput>
            </View>
          </View>
        </View>
        
        {/* Clear and solve buttons */}
        <View style={styles.buttonRow} >
          <TouchableHighlight onPress={this.onPressClear} underlayColor="white">
            <View style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </View>
          </TouchableHighlight>
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
    // borderRadius: 7,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  solveButton: {
    width: 90,
    alignItems: 'center',
    // backgroundColor: '#f1f1f1',
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