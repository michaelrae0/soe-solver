import { connect } from 'react-redux';
import { addSystem } from '../actions';
import Results from '../Components/Results';

const mapStateToProps = state => ({
  log: state.log
})

export default connect(
  mapStateToProps,
)(Results)