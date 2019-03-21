import React from 'react';
import { ScrollView, Button } from 'react-native';
import EquationsContainer from '../containers/EquationsContainer'
import ResultsContainer from '../containers/ResultsContainer'

export default class SolverScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Solver',
    headerLeft: null,
    headerRight: 
        <Button
          title="History"
          onPress={() => navigation.navigate('History')}
        />
  })
  
  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <EquationsContainer />
        <ResultsContainer />
      </ScrollView>
    );
  }
}