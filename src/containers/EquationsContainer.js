import { connect } from 'react-redux';
import Equations from '../Components/Equations';

const mapStateToProps = state => ({log: state.log})

export default connect(mapStateToProps)(Equations)