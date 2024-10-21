import React from 'react';
//import s from './SimpleDate.module.css';
import { TextField } from '@material-ui/core';

// пропсы для поля
export const getSimpleDateProps = (fieldName, fieldProps) => {
    let result = {};
    result['id'] = fieldName;
    result['label'] = fieldName.substring(6);
    result['value'] = fieldProps.values[fieldName];
    result['touched'] = fieldProps.touched || {};
    result['errors'] = fieldProps.errors || {};
    result['handleChange'] = fieldProps.handleChange;
    result['styles'] = fieldProps.styles || {};
    result['muiStyles'] = fieldProps.muiStyles;
    result['withTime'] = fieldProps.withTime || false;
    result['disabled'] = fieldProps.disabled || false;

    return result;
}

// поле date
export const SimpleDateField = (props) => {
    return <TextField
        type={props.withTime ? 'datetime-local' : 'date'}
        variant='outlined'
        InputLabelProps={{
            shrink: true
        }}
        error={Boolean(props.touched[props.id] && props.errors[props.id])}
        helperText={props.touched[props.id] && props.errors[props.id] && '*Обязательное поле'}
        className={props.muiStyles && props.muiStyles.root}
        InputProps={{
            classes: { root: props.muiStyles && props.muiStyles.inputRoot },
            style: props.styles
        }}
        id={props.id}
        value={props.value}
        onChange={props.handleChange}
        disabled={props.disabled}
    />
}
