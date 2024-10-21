import React from 'react';
import s from './Base.module.css'
import { SimpleTextField, getSimpleTextProps } from '../../../../UIElements/SimpleText/SimpleText';
import { getSimpleReactSelectProps, SimpleReactSelectField } from '../../../../UIElements/SimpleReactSelect/SimpleReactSelect';

// эти поля "базовые" - пока только для систем типа sm и 4me
const Base = ({ values, errors, handleChange, reactSelectProps, fieldProps, setFieldValueType, setFieldValueAuthType, multilineFieldProps, ...props }) => {
    return <>
        {/* {errors.name && errors.name === '*' && <p className={s.error}>Поле 'Название' не заполнено</p>}
        {errors.type && errors.type === '*' && <p className={s.error}>Поле 'Тип' не заполнено</p>} */}
        <div className={s.grid}>
            <label htmlFor='UserId'>Системная УЗ</label>
            <p className={s.p}>*</p>
            <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('UserId', props.searchLists.userList.data, { ...reactSelectProps })} /></div>
        </div>
        <div className={s.grid}>
            <label htmlFor='WSUrlBase'>WS. UrlBase</label>
            <p className={s.p}>*</p>
            <div className={s.field}><SimpleTextField {...getSimpleTextProps('WSUrlBase', { ...fieldProps, values, errors, handleChange, placeholder: 'WS. UrlBase', variant: 'outlined', size: 'small' })} /></div>
        </div>
        <div className={s.grid}>
            <label className={s.label} htmlFor="WSUrlAttach">WSUrlAttach</label>
            <p className={s.p}></p>
            <div className={s.field}><SimpleTextField {...getSimpleTextProps('WSUrlAttach', { ...fieldProps, values, errors, handleChange, placeholder: 'WSUrlAttach', variant: 'outlined', size: 'small' })} /></div>
        </div>
        <div className={s.grid}>
            <label className={s.label}>Тип авторизации</label>
            <p className={s.p}>*</p>
            <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('AuthType', ['No auth', 'Basic'],
                { ...reactSelectProps, ...{ setFieldValue: setFieldValueAuthType } })} /></div>
        </div>
        {values.AuthType === 'Basic' && <div className={s.grid}>
            <label htmlFor="WSLogin">WS.Логин</label>
            <p className={s.p}>*</p>
            <div className={s.field}><SimpleTextField {...getSimpleTextProps('WSLogin', { ...fieldProps, values, errors, handleChange, placeholder: 'WS.Логин', variant: 'outlined', size: 'small' })} /></div>
        </div>}
        {values.AuthType === 'Basic' && <div className={s.grid}>
            <label htmlFor="WSPassword">WS.Пароль</label>
            <p className={s.p}>*</p>
            <div className={s.field}><SimpleTextField {...getSimpleTextProps('WSPassword', { ...fieldProps, values, errors, handleChange, type: 'password', placeholder: 'WS.Пароль', variant: 'outlined', size: 'small' })} /></div>
        </div>}
        <div className={s.grid}>
            <label htmlFor="WSHeader">WS.Заголовки</label>
            <p className={s.p}></p>
            <div className={s.field}><SimpleTextField {...getSimpleTextProps('WSHeader', { ...multilineFieldProps, values, errors, handleChange, placeholder: 'WS.Заголовки', variant: 'outlined', multiline: true, rows: 6, rowsMax: 6 })} /></div>
        </div>
        <div className={s.grid}>
            <label htmlFor="StpWSUrlPath">STP WS.UrlPath</label>
            <p className={s.p}></p>
            <div className={s.field}><SimpleTextField {...getSimpleTextProps('StpWSUrlPath', { ...fieldProps, values, errors, handleChange, placeholder: 'STP WS.UrlPath', variant: 'outlined', size: 'small' })} /></div>
        </div>
    </>
};

export default Base;
