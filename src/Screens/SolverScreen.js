import React from 'react';
import { ScrollView, Button } from 'react-native';
import EquationsContainer from '../containers/EquationsContainer'
import ResultsContainer from '../containers/ResultsContainer'

export default class SolverScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAnswers: false, // Toggle showing answers in Results component
      error: false, // Error message
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

  toggleError = string => {
    // Link between Equations and SolverScreen for errors
    if (string) this.setState({ error: string });
    else this.setState({ error: false })
  }

  toggleAnswers = bool => {
    // Link between Equations and SolverScreen for toggling answers
    if (bool) this.setState({ showAnswers: true });
    else this.setState({ showAnswers: false })
  }
  
  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <EquationsContainer
          toggleAnswers={this.toggleAnswers}
          toggleError={this.toggleError}
        />
        <ResultsContainer
          showAnswers={this.state.showAnswers}
          error={this.state.error}
        />
      </ScrollView>
    );
  }
}