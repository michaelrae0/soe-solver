import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Results extends React.Component {
  render() {
    let log = 0
    let x = '?';
    let y = '?';

    if (this.props.log[0]) {
      log = this.props.log
      x = log[log.length-1].x;
      y = log[log.length-1].y;
    }

    return (
      <View style={styles.results}> 
        <View style={styles.container}>
          <Text style={styles.text}>x = {x}</Text>
          <Text style={styles.text}>y = {y}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  results: {
    flex: 0.35,
    // backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: -40,
  },
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    padding: 10,
  },
});