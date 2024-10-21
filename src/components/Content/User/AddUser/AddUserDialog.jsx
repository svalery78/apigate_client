import React from 'react';
import s from '../UserDialog.module.css';
import { Formik, Form, Field, FieldArray } from 'formik';
import OverlaySpinner from '../../../UIElements/OverlaySpinner/OverlaySpinner';
import { SimpleTextField, getSimpleTextProps } from '../../../UIElements/SimpleText/SimpleText'
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SimpleReactSelectField, getSimpleReactSelectProps } from '../../../UIElements/SimpleReactSelect/SimpleReactSelect';
import { setFieldsAsRequired } from '../../../../utils/validate';

// const MultiItem = ({ editModeProps = {}, ...props }) => {
//     const getEditModeElement = (editModeType) => {
//         const asyncSelectProps = {
//             values: editModeProps.formikCtrl.values, //formik
//             setFieldTouched: editModeProps.formikCtrl.setFieldTouched, //formik
//             setFieldValue: editModeProps.formikCtrl.setFieldValue, //formik
//             filename: editModeProps.filename, //Filename, который отправляется в запросе
//             getDataList: editModeProps.getBigDataList, //Функция для получения данных и их обработки
//         }

//         return <div className={props.shortField ? s.shortSimpleROField : s.simpleROField}>
//             <SimpleTextField {...getSimpleTextProps(editModeProps.formikFieldName, { ...editModeProps.formikCtrl, disabled: editModeProps.isRO })} />
//         </div>;
//     }

//     return <>
//         <div className={s.multiLabel}>{props.label}</div>
//         <div className={s.multiROField}>{getEditModeElement(editModeProps.editModeType)}</div>
//     </>
// }

const AddUserDialog = ({ record, ...props }) => {

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
            <div className={s.title}>
                Создать
            </div>
            <IconButton onClick={() => props.handleClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'initial' }}>
            <Formik
                enableReinitialize
                initialValues={{
                    id: '',
                    login: '',
                    password: '',
                    role: '',
                    authType: 'Basic',
                    whiteList: [''],
                }}
                onSubmit={(values) => {
                    values.whiteList = values.whiteList.filter(item => item !== '');
                    props.signupUser(values, props.refreshList)
                    props.handleClose()
                }}
                validate={values => {
                    const errors = {};

                    if (values.authType === 'Basic' && !values.login) {
                        errors.login = '*';
                    }
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
                    errors,
                    values,
                    touched,
                    handleChange,
                    setFieldValue
                }) => {

                    const reactSelectProps = {
                        setFieldValue: setFieldValue,
                        values: values,
                        customStyles: reactSelectStyles,
                        errors
                    };
                    const fieldProps = {
                        values: props.values,
                        handleChange: props.handleChange,
                        styles: { height: '38px' },
                        muiStyles,
                        autoComplete: 'new-password'
                    };
                    const setFieldValueAuthType = (id, value) => {
                        setFieldValue(id, value);

                        if (value !== 'Basic') {
                            setFieldValue('login', '');
                            setFieldValue('password', '');
                            setFieldValue('role', 'System');
                        }
                    }
                    // const setWhiteList = (id, value) => {
                    //     console.log('setWhiteList');
                    //     setFieldValue(id, value);
                    // }
                    // const formikCtrl = { values, errors, setFieldValue, touched, handleChange };

                    return <Form>
                        <div>
                            <OverlaySpinner active={false}>
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
                                                render={arrayHelpers => {
                                                    return <div className={s.listItems}>
                                                        {values.whiteList.map((formItem, index) => {
                                                            return <div key={index} className={s.listItemGrid}>
                                                                <Field name={`whiteList.${index}`} className={s.listItemGridField} />
                                                                {/* <SimpleTextField {...getSimpleTextProps(`whiteList.${index}`, { ...fieldProps, values, errors, handleChange, variant: 'outlined', size: 'small' })} /> */}
                                                                {index > 0 && <button type='button' onClick={() => arrayHelpers.remove(index)}> - </button>}
                                                                <button type='button' onClick={() => arrayHelpers.insert(index, '')}> + </button>
                                                            </div>
                                                        })}
                                                    </div>
                                                }}
                                            />
                                        </div>
                                    </div>}
                                    {/* <MultiItem label='WhiteList:' value={values.whiteList} editMode={true}
                                        editModeProps={
                                            {
                                                formikCtrl: formikCtrl,
                                                formikFieldName: 'whiteList',
                                                listName: 'whiteList',
                                                defaultListData: values.whiteList,
                                                setList: setWhiteList,
                                                editModeType: 'asyncSelect',
                                                onFieldChange: setWhiteList
                                            }
                                        }
                                    /> */}
                                    {values.authType === 'Basic' && <div className={s.grid}>
                                        <label>Пароль</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('password', { ...fieldProps, values, errors, handleChange, placeholder: 'Пароль', type: 'password', variant: 'outlined', size: 'small' })} /></div>
                                    </div>}
                                    <div className={s.grid}>
                                        <label className={s.label}>Роль</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('role', ['Admin', 'System', 'User'],
                                            { ...reactSelectProps, ...{ disabled: values.authType === 'WhiteList' } })} /></div>
                                    </div>
                                </div>
                                <div className={s.btnPanel}>
                                    <button className='btn btn-outline-secondary' type='submit'  >
                                        Сохранить
                                    </button>
                                    <br />
                                    <button className='btn btn-outline-secondary' type='button' onClick={props.handleClose} >
                                        Отмена
                                    </button>
                                </div>
                            </OverlaySpinner>
                        </div>
                    </Form >
                }}
            </Formik >
        </DialogContent>
    </Dialog>




};

export default AddUserDialog;
