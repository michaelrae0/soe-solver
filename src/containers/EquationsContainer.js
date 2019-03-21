import { connect } from 'react-redux';
import { addSystem } from '../actions';
import Equations from '../Components/Equations';

const mapStateToProps = state => ({
  log: state.log
})

// const mapDispatchToProps = dispatch => ({
//   log: action => dispatch(addSystem(state))
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Equations)