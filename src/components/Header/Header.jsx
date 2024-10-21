import React from 'react'
import Label from './Label'
import Logout from '../Login/Logout'
import s from './Header.module.css'
import {signoutUser} from '../../redux/auth-reducer'
import { connect } from 'react-redux'

const Header = (props) => {
    const signoutUser = props.signoutUser
    return (
        <div className={s.header}>
            <div className={s.title}><Label /></div>
            <div className={s.currentHeader}>{`   `}</div>
            <div className={s.logout}><Logout signoutUser={signoutUser}/></div>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    login: state.auth.login,
    userIsLogging: state.auth.userIsLogging
})

export default connect(mapStateToProps, {signoutUser})(Header)