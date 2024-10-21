import { authAPI } from '../api/auth'
// import { userAPI } from '../api/user'
import Cookie from 'js-cookie';
import history from './history';
import { showAlert } from "./mainReducer";

let initialState = {
  userIsLogging: false,
  user: {
    id: '',
    login: '',
    role: ''
  },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'APIGATE/AUTH/LOGIN_SUCCESS':
      return {
        ...state,
        user: action.value,
      }
    case 'APIGATE/AUTH/LOGOUT_SUCCESS':
      return {
        ...state,
        user: null,
      }
    case 'APIGATE/AUTH/USER_IS_LOGGING':
      return {
        ...state,
        userIsLogging: action.value,
      }
    default:
      return state;
  }
}
export const loginSuccess = (value) => ({ type: 'APIGATE/AUTH/LOGIN_SUCCESS', value: value });
export const logoutSuccess = () => ({ type: 'APIGATE/AUTH/LOGOUT_SUCCESS' });
export const setUserIsLogging = (value) => ({ type: 'APIGATE/AUTH/USER_IS_LOGGING', value });


export const signinUser = (user) => async (dispatch) => {
  dispatch(setUserIsLogging(true));
  try {
    let data = await authAPI.signinUser(user)
    if (data.success) {
      Cookie.set('token', data.user.accessToken);
      Cookie.set('userId', data.user.id);
      dispatch(loginSuccess(data.user))
      history.push('/');//main, если картинку ставим на пустой странице
    }
    if (data.user.role !== 'Admin') {
      dispatch(setUserIsLogging(false));
      dispatch(showAlert({ text: `Доступ разрешен только Администраторам системы`, severity: 'warning', title: 'Не удалось осуществить вход' }));
    }
  } catch (e) {
    dispatch(setUserIsLogging(false));
    dispatch(showAlert({ text: `Не удалось осуществить вход. ${e}`, severity: 'error', title: 'Неверный логин/пароль' }));
  }
}
export const signoutUser = () => (dispatch) => {
  authAPI.signoutUser()
    .then(data => {
      if (data.success) {
        Cookie.remove('token');
        Cookie.remove('userId');
        dispatch(logoutSuccess());
        history.push('/login');
        dispatch({ type: 'HUB/ROOT/RESET_STATE' });
      }
    })
    .catch(error => { dispatch(showAlert({ text: `${error}`, severity: 'error', title: 'Выход' })); })
}