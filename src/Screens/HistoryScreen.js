import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import cloneDeep from 'clone-deep';
import _ from 'lodash';
import Swipeout from 'react-native-swipeout';

import { removeSystem, addSystem } from '../actions/index'

class Entry extends React.Component { 
  render() {
    let item = this.props.item;
    let index = this.props.index

    // Delete button.
    let swipeoutBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => this.props.dispatch(removeSystem(this.props.length - 1 - index)), // Index must be re-reversed.
    }]

    let ignore = (num, check, text) => {
      if (num === check) return null;
      else return text;
    }
    let ignoreCoeff = n => {
      if ( !ignore(n, '0', n) || !ignore(n, '', n) ) return null;
      else return n
    }
    let ignoreX = n => {
      if ( !ignore(n, '0', n) || !ignore(n, '', n) ) return null;
      else return 'x'
    }
    let ignoreY = n => {
      if ( !ignore(n, '0', n) || !ignore(n, '', n) ) return null;
      else return 'y'
    }
    let ignorePlus = (n1, n2) => {
      if ( !ignoreX(n1) || !ignoreY(n2) ) return null;
      else return '+';
    }

    return (
      <Swipeout
        right={swipeoutBtns}
        backgroundColor= 'transparent'
      >
        <View style={[styles.elemContainer, this.props.extraStyles]} >
          <View style={styles.bracketContainer} >
            <Image source={require('../../assets/images/bracket.png')}  style={styles.bracket}/>
          </View>
          <View style={styles.equationContainer} >
            <Text style={[styles.equation, {top: 18}]} >{ignoreCoeff(item.a1)}{ignoreX(item.a1)}{ignorePlus(item.a1, item.b1)}{ignoreCoeff(item.b1)}{ignoreY(item.b1)}={item.t1}</Text>
            <Text style={[styles.equation, {top: 5}]} >{ignoreCoeff(item.a2)}{ignoreX(item.a2)}{ignorePlus(item.a2, item.b2)}{ignoreCoeff(item.b2)}{ignoreY(item.b2)}={item.t2}</Text>
          </View>
          <View style={styles.resultContainer} >
            <Text style={[styles.result, {top: 18}]} >x = {item.x}</Text>
            <Text style={[styles.result, {top: 5}]} >y = {item.y}</Text>
          </View>
        </View>
      </Swipeout>
    )
  }
}

const mapStateToProps = state => ({log: state.log})

const EntryContainer = connect(mapStateToProps)(Entry)


export default class History extends React.Component {
  static navigationOptions = {
    title: 'History',
  }

  isRepeated = (ind, arr) => {
    // Check if current obj matches any obj before it.
    for (let i = ind-1; i >= 0; i--) {
      if (_.isEqual(arr[ind], arr[i])) return true;
    }

    // If we made it here, there are no matches.
    return false;
  }

  renderItem = ({item, index}) => {
    let logCopyReversed = cloneDeep(this.props.log).reverse();

    // Create a top border for the first item.
    if (item === logCopyReversed[0]) {
      return  (
        <EntryContainer
          length={logCopyReversed.length}
          item={item}
          index={index}
          extraStyles={{borderTopWidth: 1}}
        />
      );
    }
    // If we made it here, post the item normally.
    return(
        <EntryContainer
          length={logCopyReversed.length}
          item={item}
          index={index}
          extraStyles={{}}
        />
      );
  }

  render() {
    // Clone and reverse array.
    let logCopyReversed = cloneDeep(this.props.log).reverse();

    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={logCopyReversed}
          style={styles.list}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  list: {
    top: -1,
  },

  // List row
  elemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
    height: 100,
  },
  firstElem: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },

  // Image
  bracketContainer: {
    flex: 0.13
  },
  bracket: {
    height: 120,
    width: 120,
    top: -10,
    left: -30,
  },

  // Equations
  equationContainer: {
    justifyContent: 'center',
    flex: 0.47
  },
  equation: {
    flex: 0.5,
    fontSize: 20,
  },

  // Results
  resultContainer: {
    flex: 0.4,
    justifyContent: 'center',
  },
  result: {
    flex: 0.5,
    fontSize: 20,
  },
})