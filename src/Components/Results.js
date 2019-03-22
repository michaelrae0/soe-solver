import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Results extends React.Component {
  render() {
    let log = 0
    let x = '?';
    let y = '?';

    // Verify there is a state to work with.
    if (this.props.log[0]) {
      log = this.props.log
      x = log[log.length-1].x;
      y = log[log.length-1].y;
    }

    // Check whether to show or hide answers.
    if (this.props.showAnswers) {
      return (
        <View style={styles.results}> 
          <View style={styles.container}>
            <Text style={styles.text}>x = {x}</Text>
            <Text style={styles.text}>y = {y}</Text>
          </View>
        </View>
      );
    }
    else return null;
  }
}

const styles = StyleSheet.create({
  results: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    padding: 10,
  },
});