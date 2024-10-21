import React from 'react';
import s from './SearchDialog.module.css';
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../../UIElements/OverlaySpinner/OverlaySpinner';
import { SimpleTextField, getSimpleTextProps } from '../../../UIElements/SimpleText/SimpleText'
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SimpleReactSelectField, getSimpleReactSelectProps } from '../../../UIElements/SimpleReactSelect/SimpleReactSelect';
import { checkFieldsByRegExp } from '../../../../utils/validate';

const SearchDialog = ({ data, ...props }) => {
    const initialSearchValues = props.searchFilter;
    const reactSelectStyles = {
        '&:hover': {
            borderColor: 'black'
        },
        'width': '100%',
        'height': '38px',
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

    return <Dialog maxWidth='md' open={props.open} fullWidth={true} >
        <DialogTitle disableTypography className={s.dialogTitle}>
            <div className={s.title}>
                Поиск
            </div>
            <IconButton onClick={() => props.handleClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'initial' }}>
            <Formik
                enableReinitialize
                initialValues={initialSearchValues}
                onSubmit={(values) => {
                    props.setSearchFilter(values);
                    props.handleClose();
                }}
                validate={values => {
                    const errors = {};
                    return checkFieldsByRegExp(['id'], /^[0-9a-fA-F]{24}$/, values, errors);
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
                    };
                    return <Form>
                        <div>
                            <OverlaySpinner active={false}>
                                <div>
                                    {errors.id && errors.id === 'incorrectFormat' && <p className={s.error}>Неверный формат поля ID</p>}
                                    <div className={s.grid}>
                                        <label className={s.label}>ID</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('id', { ...fieldProps, values, errors, handleChange, placeholder: 'ID', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Название</label>
                                        <div className={s.field}> <SimpleTextField {...getSimpleTextProps('name', { ...fieldProps, values, errors, handleChange, placeholder: 'Название', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Тип</label>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField}{...getSimpleReactSelectProps('type', ['','sm','json'], { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Системная УЗ</label>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('UserId', props.searchLists.userList.data, { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Ответственный. ФИО</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ResponsibleFIO', { ...fieldProps, values, errors, handleChange, placeholder: 'Ответственный. ФИО', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Ответственный. Email</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ResponsibleEmail', { ...fieldProps, values, errors, handleChange, placeholder: 'Ответственный. Email', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Ответственный. Телефон</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ResponsiblePhone', { ...fieldProps, values, errors, handleChange, placeholder: 'Ответственный. Телефон', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>WSUrlBase</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('WSUrlBase', { ...fieldProps, values, errors, handleChange, placeholder: 'WSUrlBase', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>WSLogin</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('WSLogin', { ...fieldProps, values, errors, handleChange, placeholder: 'WSLogin', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    {/* <div className={s.grid}>
                                        <label className={s.label}>WSHeader</label>
                                       <div className={s.field}><SimpleTextField {...getSimpleTextProps('WSHeader', { ...fieldProps, values, errors, handleChange, placeholder: 'WSHeader', variant: 'outlined', size: 'small' })} /></div>
                                    </div> */}

                                    <div className={s.grid}>
                                        <label className={s.label}>WSUrlAttach</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('WSUrlAttach', { ...fieldProps, values, errors, handleChange, placeholder: 'WSUrlAttach', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>StpWSUrlPath</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('StpWSUrlPath', { ...fieldProps, values, errors, handleChange, placeholder: 'StpWSUrlPath', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                </div>
                                <div className={s.btnPanel}>
                                    <button className="btn btn-primary" type="submit"  >
                                        Поиск
                                    </button>
                                    <button className="btn btn-outline-secondary" type="button" onClick={props.handleClose} >
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

export default SearchDialog;
