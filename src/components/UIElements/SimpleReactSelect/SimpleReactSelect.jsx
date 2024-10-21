import React from 'react';
import s from './SimpleReactSelect.module.css';
import Select, { components } from 'react-select';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

//Для того, чтобы иконка копирования гармонично смотрелась в строке инпута
const useStyles = makeStyles((theme) => ({
    padding: {
        padding: '4px'
    }
}));

const getOption = (data) => {
    const listData = data ? [...data] : [];

    return listData.map(object => {
        if (object.label) {
            return { value: object.value, label: object.label }
        }
        return { value: object, label: object }
    });
}

// пропсы для поля
export const getSimpleReactSelectProps = (fieldName, listData, fieldProps) => {
    let result = {};
    result['id'] = fieldName;
    result['label'] = fieldName.substring(6);
    result['value'] = fieldProps.values[fieldName];
    result['touched'] = fieldProps.touched || {};
    result['errors'] = fieldProps.errors || {};
    //result['addParams'] = getAddParams(addParams, fieldProps.values); //Доп. параметры (Зависимые поля, нужные для получения корректых данных)
    result['options'] = getOption(listData);
    result['handleChange'] = fieldProps.handleChange;
    result['customStyles'] = fieldProps.customStyles; //Кастомные стили (Например, на формах поиска поля с прямыми углами бордера)
    result['isMulti'] = fieldProps.isMulti || false; //Multiselect
    result['disabled'] = fieldProps.disabled || false;
    result['required'] = fieldProps.required || true;
    result['placeholder'] = fieldName.substring(6);
    result['inputField'] = fieldName;
    result['setFieldValue'] = fieldProps.setFieldValue;
    result['setFieldTouched'] = fieldProps.setFieldTouched;
    result['customChange'] = fieldProps.customChange;
    result['isClearable'] = fieldProps.isClearable === undefined ? false : fieldProps.isClearable;
    result['isCopyEnabled'] = Boolean(fieldProps.isCopyEnabled); //Возможность копирования значения в поле
    return result;
}
// поле select c лейблом
export const SimpleReactSelect = (props) => {
    return <>
        <div className={s.label}>{props.label}</div>
        <SimpleReactSelectField {...props} />
    </>
}
// поле ReactSelect 
export const SimpleReactSelectField = (
    {
        id, // наименование поля
        setFieldTouched, customStyles = {}, errors, touched, values, ...props
    }) => {
    const noOptionsMessage = 'Данные не найдены. Для поиска введите как минимум 3 символа';
    const simpleReactSelectStyles = {
        option: (provided) => ({
            ...provided,
            ...customStyles,
            color: 'black',
            //fontSize: 'var(--fontSizeLarge)',
        }),
        control: (provided) => {
            const controlStyleObj = {
                ...provided,
                ...customStyles,
                color: 'black',
                //fontSize: 'var(--fontSizeLarge)',
            }
            if (errors[id] && touched[id]) {
                controlStyleObj.borderColor = 'red';
                controlStyleObj['&:hover'] = {
                    borderColor: 'red'
                }
            }
            return controlStyleObj;
        },
        singleValue: (provided) => ({
            ...provided,
            ...customStyles,
            color: 'black',
            //fontSize: 'var(--fontSizeLarge)',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen && 'rotate(180deg)'
        }),
        container: (provided) => ({
            ...provided,
            ...customStyles
        }),
    }
    //Цвет более нейтральный, чтобы так в глаза не бросался
    const simpleTheme = theme => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary: theme.colors.primary50
        },
    })

    const onChange = (id, option) => {
        const value = props.isMulti
            ? option.map(item => item.value ? item.value : '')
            : option && option.value ? option.value : '';
        props.setFieldValue(id, value); //Изменение значение, все таки, должно быть всегда при срабатывании onChange
        if (props.customChange) { props.customChange(id, value); }
    }

    // дефект 8480
    // handleChange вообще не используется, форма маршрутизации поломалась - надо отрефакторить этот компонент, или с формой маршрутизации подумать

    const getValue = (value, defaultOptions) => {
        const listOptions = Array.isArray(defaultOptions) ? defaultOptions : [];
        const option = listOptions.find(item => item.value === value);

        const ret = props.isMulti
            ? value.map(item => ({ label: option ? option.label : item, value: item })) //Для мультиселекта используем массив значений
            : { label: option ? option.label : value, value }
        return ret;
    }

    return <Select
        value={getValue(props.value, props.options)}
        placeholder={''}
        noOptionsMessage={() => noOptionsMessage}
        options={props.options}
        isClearable={props.isClearable}
        styles={simpleReactSelectStyles}
        theme={simpleTheme}
        isMulti={props.isMulti}
        errors={errors}
        isDisabled={props.disabled}
        onChange={(option) => onChange(id, option)}
        menuPlacement='auto'
        components={{ IndicatorsContainer }}
        isCopyEnabled={props.isCopyEnabled}
        required={props.required}
    />   
}

/* 
    react-select не поддерживает удобного механизма для копирования текста введенного значения
    В связи с этим, я решил попробовать сделать кнопку в правой части управляемой области для копирования выбранного значения
*/
const IndicatorsContainer = ({ children, ...props }) => {
    const classes = useStyles();
    //Если не передан пропс, что включена возможность копирования значения, не отображать иконку копирования
    if (!props.selectProps.isCopyEnabled) {
        return <components.IndicatorsContainer {...props}>
            {children}
        </components.IndicatorsContainer>;
    }

    const valueObj = props.getValue();
    const value = valueObj && valueObj[0] ? (valueObj[0].label || valueObj[0].value) : '';
    //Отменяем стандартный функционал, который по клику на поле открывал или закрывал меню с опциями
    const onMouseDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    return <components.IndicatorsContainer {...props}>
        {!props.isDisabled && value.length > 0 &&
            <div className={s.copyIcon} onClick={() => navigator.clipboard.writeText(value)} onFocus={(e) => e.stopPropagation()} onMouseDown={onMouseDown}>
                <IconButton className={classes.padding} >
                    <FileCopyOutlinedIcon />
                </IconButton>
            </div>
        }
        {children}
    </components.IndicatorsContainer>
}