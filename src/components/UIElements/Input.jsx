import React from 'react';
import { useField } from 'formik';
const Input = ({ name, value, readonly, setFieldForInput, key, ...props }) => {
  /*
    Дефект 566580 - очень странная фигня, но в name приходит count, а props.name = data[i].count
    При пустых полях count / interval, из-за этого при вводе значения в одно поле, оно вводилось и во все пустые с этим именем
    Заменил name на props.name в хуке ниже
  */
  const [field] = useField(props.name);
  const style = props.style || {color: 'black', width: '98%', height: '34px', border: '1px solid lightGray', borderRadius: '3px'}
  const onChangeCallback = (e) =>{
    field.onChange(e);
    const index = e.currentTarget.dataset.index;
    setFieldForInput(e.target.name, e.target.value, index);
  }

  const input = <input 
                  style={style} 
                  id={name} 
                  name={name} 
                  type={props.type || 'text'} 
                  max={props.max}
                  value={value || field.value}
                  readOnly={readonly} 
                  onChange={(e) => onChangeCallback(e)}
                  key={key}
                  {...props}
                />;

  const dateInput = <input 
                      style={style}
                      id={name} 
                      name={name} 
                      type={'text' && props.type} 
                      max={props.max} 
                      {...field}
                      readOnly={readonly} 
                      onChange={props.onChange}
                      autoFocus={props.autoFocus}
                    />;

  return props.type === 'date'
            ? <div>{dateInput}</div>
            : input
  
}

export default Input;