import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import s from './StpDialog.module.css'
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import { SimpleTextField, getSimpleTextProps } from '../../UIElements/SimpleText/SimpleText';
import { getSimpleReactSelectProps, SimpleReactSelectField } from '../../UIElements/SimpleReactSelect/SimpleReactSelect';
import { getSimpleCheckboxProps, SimpleCheckbox } from '../../UIElements/SimpleCheckbox/SimpleCheckbox';
import { setFieldsAsRequired } from '../../../utils/validate'

const StpDialog = ({ data, ...props }) => {

    const reactSelectStyles = {
        '&:hover': {
            borderColor: 'black'
        },
        'width': '100%',
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
    return <Dialog PaperProps={{ style: { overflowY: 'initial' } }} open={props.open} fullWidth={true} >
        <DialogTitle disableTypography className={s.dialogTitle}>
            <div className={s.gridTitle}>
                <label className={s.label}>ID</label>
                <label className={s.title}>{data.ID}</label>
            </div>
            <IconButton onClick={() => props.onClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'initial' }} >
            <Formik
                enableReinitialize
                initialValues={{
                    name: data.Name,
                    SystemID: data.SystemID,
                    WSUrlPath: data.WSUrlPath,
                    blocking: data.blocking
                }}
                onSubmit={(values) => {
                    props.saveStp(values, data.ID, props.refreshList)
                    props.onClose()
                }}
                validate={values => {
                    const errors = {};
                    return setFieldsAsRequired(['name', 'SystemID'], values, errors);
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
                        muiStyles
                    };
                    return <Form>
                        <div>
                            <OverlaySpinner active={props.isLoading}>
                                <div>
                                    {errors.name && errors.name === '*' && <p className={s.error}>Поле 'Название' не заполнено</p>}
                                    {errors.SystemID && errors.SystemID === '*' && <p className={s.error}>Поле 'Система' не заполнено</p>}
                                    <div className={s.grid}>
                                        <label className={s.label}>Название</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('name', { ...fieldProps, values, errors, handleChange, placeholder: 'Название', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Система</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('SystemID', props.searchLists.systemList.data, { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>WS.UrlPath</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('WSUrlPath', { ...fieldProps, values, errors, handleChange, placeholder: 'WS.UrlPath', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Заблокировано</label>
                                        <div></div>
                                        <div className={s.checkbox}>
                                            <SimpleCheckbox {...getSimpleCheckboxProps('blocking', { values, errors, touched, setFieldValue })} />
                                        </div>
                                        <p className={s.p}></p>
                                    </div>

                                    <div className={s.btnPanel}>
                                        <button className="btn btn-outline-secondary" type="submit"  >
                                            Сохранить
                                        </button>
                                        <br />
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

export default StpDialog;
