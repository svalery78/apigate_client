import React from 'react';
import s from './UserDialog.module.css';
import { Formik, Form, Field, FieldArray } from 'formik';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SimpleTextField, getSimpleTextProps } from '../../UIElements/SimpleText/SimpleText'
import { getSimpleReactSelectProps, SimpleReactSelectField } from '../../UIElements/SimpleReactSelect/SimpleReactSelect'
import { setFieldsAsRequired } from '../../../utils/validate'

const UserDialog = ({ data, ...props }) => {

    const reactSelectStyles = {
        '&:hover': {
            borderColor: 'black'
        },
        'borderColor': 'grey',
        'width': '100%',
        'height': '33px',
    };
    const useMuiStyles = makeStyles(() => ({
        root: {
            height: '33px',
            '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                '& fieldset': {
                    borderColor: 'grey',
                }
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: 3,
                margin: '0px',
                padding: '0px',
                top: '0px'
            }
        }
    }));
    const muiStyles = useMuiStyles();
    return <Dialog PaperProps={{ style: { overflowY: 'initial' } }} open={props.open} fullWidth={true} >
        <DialogTitle disableTypography className={s.dialogTitle}>
            <div className={s.gridTitle}>
                <label className={s.label}>ID</label>
                <label className={s.title}>{data._id}</label>
            </div>
            <IconButton onClick={() => props.handleClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'initial' }} className={s.dialog} >
            <Formik
                enableReinitialize
                initialValues={{
                    login: data.login,
                    password: data.password,
                    role: data.role,
                    whiteList: data.whiteList || [''],
                    authType: data.authType
                }}
                onSubmit={(values) => {
                    values.whiteList = values.whiteList.filter(item => item !== '');
                    props.saveUser(values, data._id, props.refreshList)
                    props.handleClose()
                }}
                validate={values => {
                    const errors = {};

                    if (values.authType === 'Basic' && !values.password) {
                        errors.password = '*';
                    }
                    if (values.authType === 'WhiteList' && values.whiteList.filter(item => item !== '').length === 0) {
                        errors.whiteList= '*';
                    }

                    return setFieldsAsRequired(['authType', 'login', 'role'], values, errors);
                }}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    setFieldValue
                }) => {
                    const reactSelectProps = {
                        setFieldValue: setFieldValue,
                        values: values,
                        customStyles: reactSelectStyles
                    };
                    const fieldProps = {
                        values: props.values,
                        handleChange: props.handleChange,
                        styles: { height: '38px' },
                        muiStyles
                    }
                    const setFieldValueAuthType = (id, value) => {
                        setFieldValue(id, value);

                        if (value !== 'Basic') {
                            setFieldValue('login', '');
                            setFieldValue('password', '');
                            setFieldValue('role', 'System');
                        }
                    }

                    return <Form>
                        <div>
                            <OverlaySpinner active={props.isLoading}>
                                <div className='edit-form'>
                                    {errors.authType && errors.authType === '*' && <p className={s.error}>Поле 'Тип авторизации' не заполнено</p>}
                                    {errors.login && errors.login === '*' && <p className={s.error}>Поле 'Логин' не заполнено</p>}
                                    {errors.password && errors.password === '*' && <p className={s.error}>Поле 'Пароль' не заполнено</p>}
                                    {errors.role && errors.role === '*' && <p className={s.error}>Поле 'Роль' не заполнено</p>}
                                    {errors.whiteList && errors.whiteList === '*' && <p className={s.error}>Измените тип авторизации или заполните поле 'Список исключений'</p>}
                                    <div className={s.grid}>
                                        <label className={s.label}>Тип авторизации</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('authType', ['Basic', 'WhiteList'],
                                            { ...reactSelectProps, ...{ setFieldValue: setFieldValueAuthType } })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label>Логин</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('login', { ...fieldProps, values, errors, handleChange, placeholder: 'Логин', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    {values.authType === 'WhiteList' && <div className={s.grid}>
                                        <label className={s.label}>Список исключений</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}>
                                            <FieldArray
                                                name='whiteList'
                                                render={arrayHelpers => (
                                                    <div className={s.listItems}>
                                                        {values.whiteList.map((formItem, index) => {
                                                            return <div key={index} className={s.listItemGrid}>
                                                                <Field name={`whiteList.${index}`} className={s.listItemGridField} />
                                                                {/* <SimpleTextField {...getSimpleTextProps(`whiteList.${index}`, { ...fieldProps, values, errors, handleChange, variant: 'outlined', size: 'small' })} /> */}
                                                                {index > 0 && <button type='button' onClick={() => arrayHelpers.remove(index)}> - </button>}
                                                                <button type='button' onClick={() => arrayHelpers.insert(index, '')}> + </button>
                                                            </div>
                                                        })}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>}
                                    {values.authType === 'Basic' && <div className={s.grid}>
                                        <label>Пароль</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('password', { ...fieldProps, values, errors, handleChange, type: 'password', placeholder: 'Пароль', variant: 'outlined', size: 'small' })} /></div>
                                    </div>}
                                    <div className={s.grid}>
                                        <label >Роль</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('role', ['Admin', 'System', 'User'],
                                            { ...reactSelectProps, ...{ disabled: values.authType === 'WhiteList' } })} /></div>
                                    </div>
                                </div>
                                <div className={s.btnPanel}>
                                    <button className="btn btn-outline-secondary" type="submit"  >
                                        Сохранить
                                    </button>
                                    <br />
                                    <button className="btn btn-outline-secondary" type="button" onClick={props.handleClose} >
                                        Отмена
                                    </button>
                                </div>
                            </OverlaySpinner>
                        </div>
                    </Form >
                }}
            </Formik >
        </DialogContent >
    </Dialog >
}

export default UserDialog