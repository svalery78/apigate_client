import React from 'react';
import { Checkbox } from '@material-ui/core';

export const SimpleCheckbox = (props) => {
    const onCheckBoxChange = () => props.setFieldValue(props.id, !props.value);
    
    return <Checkbox 
        id={props.id}
        checked={props.value} 
        onChange={onCheckBoxChange}
        style={Boolean(props.errors[props.id] && props.touched[props.id]) 
            ? { color: 'red' }
            : {}
        }
    />
}

// пропсы для чекбокса
export const getSimpleCheckboxProps = (fieldName, fieldProps) => {
    let result = {};
    result['id'] = fieldName;
    result['value'] = fieldProps.values[fieldName];
    result['touched'] = fieldProps.touched || {};
    result['errors'] = fieldProps.errors || {};
    result['setFieldValue'] = fieldProps.setFieldValue; // Formik сам не меняет значение чекбокса, приходится в onChange прописывать руками, поэтому этот пропс обязательный
    
    return result;
}