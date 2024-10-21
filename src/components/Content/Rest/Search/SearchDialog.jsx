import React from 'react';
import s from './SearchDialog.module.css';
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../../UIElements/OverlaySpinner/OverlaySpinner';
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SimpleDateField, getSimpleDateProps } from '../../../UIElements/SimpleDate/SimpleDate';
import { SimpleReactSelectField, getSimpleReactSelectProps } from '../../../UIElements/SimpleReactSelect/SimpleReactSelect';
import { SimpleTextField, getSimpleTextProps } from '../../../UIElements/SimpleText/SimpleText';
import { checkFieldsByRegExp } from '../../../../utils/validate';

const useMuiStyles = makeStyles(() => ({
    inputRoot: {
        width: '100%'
    },
    root: {
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

const SearchDialog = ({ data, ...props }) => {
    const initialSearchValues = props.showErrorsOnly ? { status: 'ERROR' } && props.searchFilter : props.searchFilter;
    const reactSelectStyles = {
        '&:hover': {
            borderColor: 'black'
        },
        'width': '100%',
        'borderColor': 'black'
    };
    const muiStyles = useMuiStyles();

    return <Dialog open={props.open} fullWidth={true} >
        <DialogTitle disableTypography className={s.dialogTitle}>
            <div className={s.title}>
                Поиск
            </div>
            <IconButton onClick={() => props.handleClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'initial' }} >
            <Formik
                enableReinitialize
                initialValues={initialSearchValues}
                onSubmit={(values) => {
                    props.setSearchFilter(values);
                    props.handleClose();
                }}
                validate={values => {
                    const errors = {};
                    return checkFieldsByRegExp(['ID', 'objectID'], /^[0-9a-fA-F]{24}$/, values, errors);
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
                        values: values,
                        handleChange: handleChange,
                        styles: { height: '38px' },
                        muiStyles
                    };
                    const dateProps = {
                        values: values,
                        handleChange: handleChange,
                        styles: { height: '38px' },
                        muiStyles
                    };

                    return <Form>
                        <div>
                            <OverlaySpinner active={false}>
                                <div>
                                    {/* {errors.ID && errors.ID === 'incorrectFormat' && <p className={s.error}>Неверный формат поля ID</p>} */}
                                    {errors.objectID && errors.objectID === 'incorrectFormat' && <p className={s.error}>Неверный формат поля Объект.ID</p>}
                                    {/* <div className={s.grid}>
                                        <label className={s.label}>ID</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ID', { ...fieldProps, errors, placeholder: 'ID', variant: 'outlined', size: 'small' })} /></div>
                                    </div> */}
                                    <div className={s.grid}>
                                        <label className={s.label}>Объект.ID</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('objectID', { ...fieldProps, values, errors, handleChange, placeholder: 'Объект.ID', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Тип</label>
                                       <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('type', ['Входящий', 'Исходящий'], { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Таблица</label>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('tableName', ['object', 'attachment', 'stp'], { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <div className={s.label}>Создано от</div>
                                        <div className={s.field}><SimpleDateField {...getSimpleDateProps('createdFrom', { ...dateProps, withTime: true })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <div className={s.label}>Создано до</div>
                                        <div className={s.field}><SimpleDateField {...getSimpleDateProps('createdBefore', { ...dateProps, withTime: true })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Статус</label>
                                        {/* <TextField className={s.textField} value={values.status} onChange={handleChange} name='status' placeholder='Статус' variant='outlined' fullWidth size='small' 
                                            inputProps={{ readOnly: props.showErrorsOnly }}/> */}
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('status', ['SUCCESS', 'ERROR', 'SENDING'], { ...reactSelectProps, disabled: props.showErrorsOnly })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Url</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('url', { ...fieldProps, values, errors, handleChange, placeholder: 'url', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Система</label>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('systemId', props.searchLists.systemList.data, { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Комментарий</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('info', { ...fieldProps, values, errors, handleChange, placeholder: 'Комментарий', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                </div>
                                <div className={s.btnPanel}>
                                    <button className="btn btn-primary" type="submit"   >
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
