import App from './App';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loginSuccess, signoutUser } from './redux/auth-reducer';
import { closeAlert } from './redux/mainReducer';

const AppContainer = (props) => {
  return <App {...props} />;
}

const mapStateToProps = (state) => ({
  alertShow: state.main.alertShow,
  alertText: state.main.alertText,
  alertSeverity: state.main.alertSeverity,
  alertTitle: state.main.alertTitle,
  alertDate: state.main.alertDate,
  user: state.auth.user
})

export default compose(
  connect(mapStateToProps, { closeAlert, loginSuccess, signoutUser })
)(AppContainer);