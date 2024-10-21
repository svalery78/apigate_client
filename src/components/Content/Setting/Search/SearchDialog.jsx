import React from 'react';
import s from './SearchDialog.module.css';
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../../UIElements/OverlaySpinner/OverlaySpinner';
import { SimpleTextField, getSimpleTextProps } from '../../../UIElements/SimpleText/SimpleText'
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getSearchParams } from '../../../../utils/search';
import { checkFieldsByRegExp } from '../../../../utils/validate';

const SearchDialog = ({ data, ...props }) => {
    const initialSearchValues = props.searchFilter;
    const useMuiStyles = makeStyles(() => ({
        root: {
            height: '33px',
            '& .MuiOutlinedInput-root': {
                borderRadius: 3
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: 3
            }
        }
    }));
    const muiStyles = useMuiStyles();

    return <Dialog open={props.open} fullWidth={false} >
        <DialogTitle disableTypography className={s.dialogTitle}>
            <h5 className={s.label}>
                Поиск
            </h5>
            <IconButton onClick={() => props.handleClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
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
                    handleChange
                }) => {
                    const fieldProps = {
                        values: props.values,
                        handleChange: props.handleChange,
                        styles: { height: '25px', margin: '-2px 0px 2px 10px', padding: '0px' },
                        muiStyles
                    };

                    return <Form>
                        <div>
                            <OverlaySpinner active={false}>
                                <div>
                                    {errors.id && errors.id === 'incorrectFormat' && <p className={s.error}>Неверный формат поля ID</p>}
                                    {/* <div className={s.grid}>
                                        <label className={s.label}>ID</label>
                                        <SimpleTextField {...getSimpleTextProps('id', { ...fieldProps, values, errors, handleChange, placeholder: 'ID', variant: 'outlined', size: 'small' })} />
                                    </div> */}
                                    <div className={s.grid}>
                                        <label className={s.label}>Параметр</label>
                                        <SimpleTextField {...getSimpleTextProps('name', { ...fieldProps, values, errors, handleChange, placeholder: 'Параметр', variant: 'outlined', size: 'small' })} />
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Значение</label>
                                        <SimpleTextField {...getSimpleTextProps('value', { ...fieldProps, values, errors, handleChange, placeholder: 'Значение', variant: 'outlined', size: 'small' })} />
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

export default SearchDialog;
