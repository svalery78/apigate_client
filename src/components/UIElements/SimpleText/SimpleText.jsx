import React from 'react';
import s from './SimpleText.module.css';
import { TextField } from '@material-ui/core';

// пропсы для поля
export const getSimpleTextProps = (fieldName, fieldProps) => {
    let result = {};
    result['id'] = fieldName;
    result['label'] = fieldName.substring(6);
    result['value'] = fieldProps.values[fieldName];
    result['touched'] = fieldProps.touched || {};
    result['errors'] = fieldProps.errors || {};
    result['handleChange'] = fieldProps.handleChange;
    result['multiline'] = fieldProps.multiline;
    result['rows'] = fieldProps.rows || 1;
    result['rowsMax'] = fieldProps.rowsMax || 1;
    result['styles'] = fieldProps.styles || {};
    result['inputProps'] = fieldProps.inputProps || {};
    result['muiStyles'] = fieldProps.muiStyles;
    result['disabled'] = fieldProps.disabled || false;
    result['placeholder'] = fieldProps.placeholder || '';
    result['type'] = fieldProps.type || 'text';

    if (fieldProps.autoComplete) {
        result['autoComplete'] = fieldProps.autoComplete;
    }

    return result;
}

// поле text c лейблом
export const SimpleText = (props) => {
    return <>
        <div className={props.labelClassName || s.label}>{props.label}</div>
        <SimpleTextField {...props} />
    </>
}

// поле text
export const SimpleTextField = (props) => {
    return <TextField
        id={props.id}
        multiline={props.multiline}
        fullWidth
        value={props.value}
        onChange={props.handleChange}
        variant='outlined'
        className={props.muiStyles && props.muiStyles.root}
        // error={Boolean(props.touched[props.id] && props.errors[props.id])}
        // helperText={props.touched[props.id] && props.errors[props.id] && '*Обязательное поле'} //Ломает верстку (Поля становятся больше по высоте)
        rows={props.rows}
        rowsMax={props.rowsMax}
        InputProps={{
            style: props.styles
        }}
        autoComplete={props.autoComplete}
        disabled={props.disabled}
        placeholder={props.placeholder}
        type={props.type}
    />
}
