import React from 'react';
import { ScrollView, Button } from 'react-native';
import EquationsContainer from '../containers/EquationsContainer'
import ResultsContainer from '../containers/ResultsContainer'

export default class SolverScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAnswers: false, // Toggle showing answers in Results component
    };
  }
  
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Solver',
    headerLeft: null,
    headerRight: // To History component
        <Button
          title="History"
          onPress={() => navigation.navigate('History')}
        />
  })

  toggleAnswers = bool => {
    // Link between Equations and SolverScreen for toggling answers
    if (bool) this.setState({ showAnswers: true });
    else this.setState({ showAnswers: false })
  }
  
  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <EquationsContainer toggleAnswers={this.toggleAnswers} />
        <ResultsContainer showAnswers={this.state.showAnswers} />
      </ScrollView>
    );
  }
}