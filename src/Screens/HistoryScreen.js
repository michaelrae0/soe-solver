import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import cloneDeep from 'clone-deep';
import _ from 'lodash';

class Entry extends React.Component {
  render() {
    let item = this.props.item;

    return (
      <View style={[styles.elemContainer, this.props.extraStyles]} >
        <View style={styles.bracketContainer} >
          <Image source={require('../../assets/bracket.png')}  style={styles.bracket}/>
        </View>
        <View style={styles.equationContainer} >
          <Text style={[styles.equation, {top: 18}]} >{item.a1}x+{item.b1}y={item.t1}</Text>
          <Text style={[styles.equation, {top: 5}]} >{item.a2}x+{item.b2}y={item.t2}</Text>
        </View>
        <View style={styles.resultContainer} >
          <Text style={[styles.result, {top: 18}]} >x = {item.x}</Text>
          <Text style={[styles.result, {top: 5}]} >y = {item.y}</Text>
        </View>
      </View>
    )
  }
}

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

  render() {
    let logCopyReversed = cloneDeep(this.props.log).reverse(); // Clone array to allow it to be reversed.

    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={logCopyReversed}
          style={styles.list}
          renderItem={({item, index}) => {
            // Create a top border for the first item.
            if (item === logCopyReversed[0]) {
              return  (
                <Entry item={item} extraStyles={{borderTopWidth: 1}} ></Entry>
              );
            }

            // Check if item has already been posted
            else if (this.isRepeated(index, logCopyReversed)) {
              return null;
            }
            
            // If we made it here, post the item normally.
            return(
                <Entry item={item} extraStyles={{}} ></Entry>
              );
            }
          }
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  list: {
    top: -1,
  },
  elemContainer: {
    backgroundColor: '#f0f0f0',
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
  bracketContainer: {
    flex: 0.13
  },
  bracket: {
    height: 120,
    width: 120,
    top: -10,
    left: -30,
  },

  equationContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    flex: 0.47
  },
  equation: {
    flex: 0.5,
    fontSize: 20,
  },

  resultContainer: {
    flex: 0.4,
    justifyContent: 'center',
  },
  result: {
    flex: 0.5,
    fontSize: 20,
  },
})