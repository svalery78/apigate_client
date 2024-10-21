import React from 'react';
import s from './Telegram.module.css'
import { SimpleTextField, getSimpleTextProps } from '../../../../UIElements/SimpleText/SimpleText';
import { getSimpleReactSelectProps, SimpleReactSelectField } from '../../../../UIElements/SimpleReactSelect/SimpleReactSelect';

//это поля для телеграм, потом прешили их брать прямо из запроса 4me, но пока не стала удалять - вдруг опять передумаем
const Telegram = ({ values, errors, handleChange, reactSelectProps, fieldProps, setFieldValueType, ...props }) => {
    return <>
        <div className={s.grid}>
            <label className={s.label}>ИД чата</label>
            <p className={s.p}>*</p>
            <div className={s.field}><SimpleTextField {...getSimpleTextProps('chatId', { ...fieldProps, values, errors, handleChange, placeholder: 'ИД чата', variant: 'outlined', size: 'small' })} /></div>
        </div>
        <div className={s.grid}>
            <label className={s.label}>Режим парсинга</label>
            <p className={s.p}></p>
            <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('parseMode', ['HTML'],
                { ...reactSelectProps, ...{ setFieldValue: setFieldValueType } })} /></div>
        </div>
    </>
};

export default Telegram;
