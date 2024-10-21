import React from 'react';
import s from './SearchDialog.module.css';
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../../UIElements/OverlaySpinner/OverlaySpinner';
import { SimpleTextField, getSimpleTextProps } from '../../../UIElements/SimpleText/SimpleText'
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getSearchParams } from '../../../../utils/search';
import { SimpleReactSelectField, getSimpleReactSelectProps } from '../../../UIElements/SimpleReactSelect/SimpleReactSelect';
import { checkFieldsByRegExp } from '../../../../utils/validate';

const SearchUserDialog = ({ data, ...props }) => {
    const initialSearchValues = props.searchFilter;
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
            <h5 className={s.label}>
                Поиск
            </h5>
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
                    return checkFieldsByRegExp(['_id'], /^[0-9a-fA-F]{24}$/, values, errors);
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
                                    {errors._id && errors._id === 'incorrectFormat' && <p className={s.error}>Неверный формат поля ID</p>}
                                    <div className={s.grid}>
                                        <label className={s.label}>ID</label>
                                        <SimpleTextField {...getSimpleTextProps('_id', { ...fieldProps, values, errors, handleChange, placeholder: 'ID', variant: 'outlined', size: 'small' })} />
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Логин</label>
                                        <SimpleTextField {...getSimpleTextProps('login', { ...fieldProps, values, errors, handleChange, placeholder: 'Логин', variant: 'outlined', size: 'small' })} />
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Роль</label>
                                        <SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('role', ['Admin', 'System', 'User'], { ...reactSelectProps })} />
                                    </div>

                                </div>
                                <div className={s.btnPanel}>
                                    <button className='btn btn-primary' type='submit'  >
                                        Поиск
                                    </button>
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

export default SearchUserDialog;
