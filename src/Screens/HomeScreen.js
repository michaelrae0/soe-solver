import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';

export default class SolverScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Contact Us',
    header: null
  });
  
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer} >
          <Image source={require('../../assets/arrowsCross.png')}  style={styles.image}/>
        </View>
        <Text style={styles.title}>
          System of Equations Solver
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Solver')} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center'
  },

  imageContainer: {
    flex: 0.48,
    // backgroundColor: 'pink',
    justifyContent: 'flex-end',
  },
  image: {
    height: 200,
    width: 200,
  },

  title: {
    flex: 0.2,
    // backgroundColor: 'lightblue',
    fontSize: 40,
    textAlign: 'center',
  },

  buttonContainer: {
    // flex: 0.4
    // backgroundColor: 'orange',
  },
  button: {
    height: 50,
    width: 200,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'green',
    // backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: 'green',
  },
})