import { signinUser } from '../../redux/auth-reducer';
import Login from './Login';
import { connect } from 'react-redux';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
      values: state.auth.values,
      userIsLogging: state.auth.userIsLogging
    }
}

export default compose(connect(mapStateToProps, { signinUser }))(Login);