import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Navbar.module.css'
import SimpleButton from '../UIElements/SimpleButton/SimpleButton'
const Navbar = () => {
    return (
        <div className={s.navbar}>
            <div className={s.item}>
                <NavLink to="/object" activeClassName={s.active}>
                    <SimpleButton className={s.btn} type='button' label='Объект' />
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/system" activeClassName={s.active}>
                    <SimpleButton className={s.btn} type='button' label='Система' />
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/stp" activeClassName={s.active}>
                    <SimpleButton className={s.btn} type='button' label='СТП' />
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/user" activeClassName={s.active}>
                    <SimpleButton className={s.btn} type='button' label='Пользователь' />
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/rest" activeClassName={s.active}>
                    <SimpleButton className={s.btn} type='button' label='REST запросы' />
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/setting" activeClassName={s.active}>
                    <SimpleButton className={s.btn} type='button' label='Конфигурация' />
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/resending" activeClassName={s.active}>
                    <SimpleButton className={s.btn} type='button' label='Повтор. отправка' />
                </NavLink>
            </div>
        </div>
    )
}
export default Navbar