import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import s from '../SystemDialog.module.css'
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../../UIElements/OverlaySpinner/OverlaySpinner';
import { SimpleTextField, getSimpleTextProps } from '../../../UIElements/SimpleText/SimpleText';
import { getSimpleReactSelectProps, SimpleReactSelectField } from '../../../UIElements/SimpleReactSelect/SimpleReactSelect';
import { setFieldsAsRequired, getRequiredFields } from '../../../../utils/validate';
import StructureInfo from '../StructureInfo/StructureInfo';
import { getSimpleCheckboxProps, SimpleCheckbox } from '../../../UIElements/SimpleCheckbox/SimpleCheckbox';

const AddSystem = (props) => {
    const reactSelectStyles = {
        '&:hover': {
            borderColor: 'black'
        },
        'width': '100%',
        'minHeight': '38px',
        'borderColor': 'black'
    };
    const useMuiStyles = makeStyles(() => ({
        root: {
            '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                '& fieldset': {
                    borderColor: 'black',
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

    return <Dialog maxWidth='md' open={props.open} fullWidth={true} style={{ overflow: 'hidden' }}>
        <DialogTitle disableTypography className={s.dialogTitle}>
            <div className={s.gridTitle}>
                <span className={s.label}>{''}</span>
                <label className={s.label}>Создать</label>
            </div>
            <IconButton onClick={() => props.onClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflow: 'initial' }}>
            <Formik
                enableReinitialize
                initialValues={{
                    _id: undefined,
                    name: undefined,
                    type: undefined,
                    UserId: undefined,
                    ResponsibleFIO: undefined,
                    ResponsibleEmail: undefined,
                    ResponsiblePhone: undefined,
                    WSUrlBase: undefined,
                    WSUrlAttach: undefined,
                    AuthType: undefined,
                    WSLogin: undefined,
                    WSPassword: undefined,
                    WSHeader: null,
                    StpWSUrlPath: undefined,
                    DataStructure: undefined,
                    noReply: false
                    // chatId: undefined,
                    // parseMode: undefined
                }}
                onSubmit={(values) => {
                    let systemData = { ...values };
                    if (systemData.WSHeader) {
                        systemData.WSHeader = JSON.parse(systemData.WSHeader);
                    }

                    props.createSystem(systemData, values._id, props.refreshList)
                    props.onClose()
                }}
                validate={values => {
                    const errors = {};

                    if (values.WSHeader) {
                        try {
                            let WSHeader = JSON.parse(values.WSHeader);
                            if (typeof WSHeader !== 'object') {
                                errors.WSHeader = 'incorrectFormat';
                            }
                        } catch (e) {
                            errors.WSHeader = 'incorrectFormat';
                        }
                    }

                    if (values.AuthType === 'Basic' && !values.WSLogin) {
                        errors.WSLogin = '*';
                    }
                    if (values.AuthType === 'Basic' && !values.WSPassword) {
                        errors.WSPassword = '*';
                    }
                    if (values.type === 'json' && !values.DataStructure) {
                        errors.DataStructure = '*';
                    }

                    return setFieldsAsRequired(getRequiredFields('system', values.DataStructure, values.type), values, errors);
                }}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({
                    values,
                    errors,
                    touched,
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
                        muiStyles,
                        autoComplete: 'new-password'
                    };
                    const multilineFieldProps = {
                        values: props.values,
                        handleChange: props.handleChange,
                        //styles: { height: '38px' },
                        muiStyles
                    };
                    const setFieldValueAuthType = (id, value) => {
                        setFieldValue(id, value);

                        if (value !== 'Basic') {
                            setFieldValue('WSLogin', '');
                            setFieldValue('WSPassword', '');
                        }
                    }
                    const setFieldValueType = (id, value) => {
                        setFieldValue(id, value);

                        if (value !== 'json') {
                            setFieldValue('DataStructure', '');
                        }
                    }

                    return <Form>
                        <div>
                            <OverlaySpinner active={false}>
                                <div>
                                    {errors.name && errors.name === '*' && <p className={s.error}>Поле 'Название' не заполнено</p>}
                                    {errors.type && errors.type === '*' && <p className={s.error}>Поле 'Тип' не заполнено</p>}
                                    {errors.UserId && errors.UserId === '*' && <p className={s.error}>Поле 'Системная УЗ' не заполнено</p>}
                                    {errors.ResponsibleFIO && errors.ResponsibleFIO === '*' && <p className={s.error}>Поле 'Ответственный. ФИО' не заполнено</p>}
                                    {errors.ResponsibleEmail && errors.ResponsibleEmail === '*' && <p className={s.error}>Поле 'Ответственный. Email' не заполнено</p>}
                                    {errors.ResponsiblePhone && errors.ResponsiblePhone === '*' && <p className={s.error}>Поле 'Ответственный. Телефон' не заполнено</p>}
                                    {errors.WSUrlBase && errors.WSUrlBase === '*' && <p className={s.error}>Поле 'WS. UrlBase' не заполнено</p>}
                                    {errors.WSLogin && errors.WSLogin === '*' && <p className={s.error}>Поле 'WS.Логин' не заполнено</p>}
                                    {errors.WSPassword && errors.WSPassword === '*' && <p className={s.error}>Поле 'WS.Пароль' не заполнено</p>}
                                    {errors.AuthType && errors.AuthType === '*' && <p className={s.error}>Поле 'Тип авторизации' не заполнено</p>}
                                    {errors.DataStructure && errors.DataStructure === '*' && <p className={s.error}>Поле 'Структура' не заполнено</p>}
                                    {errors.WSHeader && errors.WSHeader === 'incorrectFormat' && <p className={s.error}>{'Поле WS.Заголовки заполнено не по формату. Требуемый формат: {"<название свойства>": "<значение>"}'}</p>}
                                    <div className={s.grid}>
                                        <label htmlFor='name'>Название</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('name', { ...fieldProps, values, errors, handleChange, placeholder: 'Название', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Тип</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('type', [' ', 'sm', 'json'],
                                            { ...reactSelectProps, ...{ setFieldValue: setFieldValueType } })} /></div>
                                    </div>
                                    {values.type === 'json' &&
                                        <div className={s.grid}>
                                            <label className={s.label}>Структура</label>
                                            <p className={s.p}>*</p>
                                            <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('DataStructure', ['4me (json)', 'telegram'], { ...reactSelectProps })} /></div>
                                        </div>
                                    }
                                    <StructureInfo structureName={values.DataStructure}
                                        values={values} errors={errors} handleChange={handleChange} reactSelectProps={reactSelectProps}
                                        fieldProps={fieldProps} setFieldValueType={setFieldValueType} {...props}
                                        setFieldValueAuthType={setFieldValueAuthType} multilineFieldProps={multilineFieldProps}
                                    />
                                    <div className={s.grid}>
                                        <label htmlFor='ResponsibleFIO'>Ответственный. ФИО</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ResponsibleFIO', { ...fieldProps, values, errors, handleChange, placeholder: 'Ответственный. ФИО', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label htmlFor='ResponsibleEmail'>Ответственный. Email</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ResponsibleEmail', { ...fieldProps, values, errors, handleChange, placeholder: 'Ответственный. Email', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label htmlFor='ResponsiblePhone'>Ответственный. Телефон</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ResponsiblePhone', { ...fieldProps, values, errors, handleChange, placeholder: 'Ответственный. Телефон', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Не отправлять ответ</label>
                                        <div></div>
                                        <div className={s.checkbox}>
                                            <SimpleCheckbox {...getSimpleCheckboxProps('noReply', { values, errors, touched, setFieldValue })} />
                                        </div>
                                        <p className={s.p}></p>
                                    </div>
                                    <div className={s.btnPanel}>
                                        <button className='btn btn-outline-secondary' type='submit'  >
                                            Сохранить
                                        </button>
                                        <br />
                                        <button className='btn btn-outline-secondary' type='button' onClick={props.onClose} >
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            </OverlaySpinner>
                        </div>
                    </Form >
                }}
            </Formik >
        </DialogContent>
    </Dialog>
};

export default AddSystem;
