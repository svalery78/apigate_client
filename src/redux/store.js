import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "./auth-reducer";
import { stpReducer } from './stp-reducer';
import { usersReducer } from './users-reducer';
import { settingReducer } from './setting-reducer';
import { systemReducer } from './system-reducer';
import { objectReducer } from './object-reducer';
import { resendingReducer } from './resending-reducer';
import restReducer from './rest-reducer';
import thunkMiddleware from 'redux-thunk';
import history from './history';
import mainReducer from './mainReducer';
import { connectRouter } from 'connected-react-router';

const reducers = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  stp: stpReducer,
  resending: resendingReducer,
  sys: systemReducer,
  obj: objectReducer,
  rest: restReducer,
  user: usersReducer,
  setting: settingReducer,
  main: mainReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'HUB/ROOT/RESET_STATE') {
    state = undefined;
  }
  return reducers(state, action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store;