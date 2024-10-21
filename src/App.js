import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthRoute from './hoc/authRoute'
import { ConnectedRouter } from 'connected-react-router';
import history from './redux/history';
import LoginContainer from './components/Login/LoginContainer';
import UserListContainer from './components/Content/User/UserListContainer';
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header';
import s from './components/Content/Content.module.css'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import StpListContainer from './components/Content/STP/StpListContainer';
import SystemListContainer from './components/Content/System/SystemListContainer';
import RestListContainer from './components/Content/Rest/RestListContainer';
import ObjectListContainer from './components/Content/Object/ObjectListContainer';
import SettingListContainer from './components/Content/Setting/SettingListContainer';
import ResendingListContainer from './components/Content/Resending/ResendingListContainer';
import Alert from './components/UIElements/Alert/Alert';
import theme from './Theme.module.css';

const MainPage = (props) => {
  return <div className={`${s.main} ${theme}`}>
    <div className={s.mainContent}>
      <div className={s.grid}>
        <div ><Navbar /></div>
        <div className={s.contentContainer}>
          <Switch>
            {/* <Route path='/main' render={() => <MainImage />} /> */}
            <Route path='/user' render={() => <UserListContainer />} />
            <Route path='/stp' render={() => <StpListContainer />} />
            <Route path='/system' render={() => <SystemListContainer />} />
            <Route path='/rest' render={() => <RestListContainer />} />
            <Route path='/object' render={() => <ObjectListContainer />} />
            <Route path='/setting' render={() => <SettingListContainer />} />
            <Route path='/resending' render={() => <ResendingListContainer />} />
          </Switch>
        </div>
      </div>
    </div>
  </div>
}

const Layout = () => {
  return (
    <div >
      <div className={s.header}><Header /></div>
      <Switch>
        <AuthRoute path='/' render={() => <MainPage />} />
        <Route path='*'
          render={() => <div>404 NOT FOUND</div>} />
      </Switch>
    </div>
  )
}

const Routes = (props) => {
  return <ConnectedRouter history={history}>
    <Switch>
      <Route path='/login' render={() => <LoginContainer />} />
      <Route path='/' render={() => <Layout {...props} />} />
    </Switch>
  </ConnectedRouter>
}

const App = (props) => {
  return <div>
      <div>
        {props.alertShow && <Alert open={props.alertShow} handleClose={() => props.closeAlert()}
          severity={props.alertSeverity} title={props.alertTitle} description={props.alertText} date={props.alertDate} />}
        <Routes {...props} />
      </div>
  </div>
}

export default App;