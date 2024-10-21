import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import s from './SettingDialog.module.css'
import {setFieldsAsRequired} from '../../../utils/validate'
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import { SimpleTextField, getSimpleTextProps } from '../../UIElements/SimpleText/SimpleText'
// import { getSimpleReactSelectProps, SimpleReactSelectField } from '../../UIElements/SimpleReactSelect/SimpleReactSelect'

const SettingDialog = ({ data, ...props }) => {

    const reactSelectStyles = {
        '&:hover': {
            borderColor: 'black'
        },
        'width': '100%',
        'borderColor': 'black'
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
                borderRadius: 3
            }
        }
    }));
    const muiStyles = useMuiStyles();
    const fieldProps = {
        values: props.values,
        handleChange: props.handleChange,
        styles: { height: '25px', margin: '-2px 0px 2px 10px', padding: '0px' },
        muiStyles
    };

    return <Dialog open={props.open} fullWidth={false} >
        <DialogTitle disableTypography className={s.dialogTitle}>
            <div className={s.gridTitle}>
                {/* <label className={s.label}>ID</label>
                <label className={s.label}>{data.id}</label> */}
                <label className={s.label}></label>
                <label className={s.label}>{}</label>
            </div>
            <IconButton onClick={() => props.onClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent className={s.dialog} >
            <Formik
                enableReinitialize
                initialValues={{
                    name: data.name,
                    value: data.value,
                }}
                onSubmit={(values) => {
                    props.saveSetting(values, data.id, props.refreshList)
                    props.onClose()
                }}
                validate={values => {
                    const errors = {};
                    return setFieldsAsRequired([
                    'name', 'value'
                ], values, errors);
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
                    return <Form>
                        <div>
                            <OverlaySpinner active={props.isLoading}>
                                <div className="edit-form">
                                {errors.name && errors.name === '*' && <p className={s.error}>Поле 'Параметр' не заполнено</p>}
                                {errors.value && errors.value === '*' && <p className={s.error}>Поле 'Значение' не заполнено</p>}
                                    <div className={s.grid}>
                                        <label htmlFor="title">Параметр</label>
                                        <p className={s.p}></p>
                                        <SimpleTextField {...getSimpleTextProps('name', { ...fieldProps, values, errors, handleChange, disabled: true, placeholder: 'Параметр', variant: 'outlined', size: 'small' })} />
                                    </div>

                                    <div className={s.grid}>
                                        <label htmlFor="title">Значение</label>
                                        <p className={s.p}>*</p>
                                       <SimpleTextField {...getSimpleTextProps('value', { ...fieldProps, values, errors, handleChange, placeholder: 'Значение', variant: 'outlined', size: 'small' })} />
                                    </div>

                                    <div className={s.btnPanel}>
                                        <button className="btn btn-outline-secondary" type="submit"  >
                                            Сохранить
                                        </button>
                                        <br/>
                                        <button className="btn btn-outline-secondary" type="button" onClick={props.onClose} >
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

export default SettingDialog;
