import { connect } from 'react-redux';
import { addSystem } from '../actions';
import Results from '../Components/Results';

const mapStateToProps = state => ({
  log: state.log
})

const mapDispatchToProps = dispatch => ({
  log: action => dispatch(addSystem(state))
})

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Results)