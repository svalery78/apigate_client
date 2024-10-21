import React from 'react';
import s from './SearchDialog.module.css';
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../../UIElements/OverlaySpinner/OverlaySpinner';
import { SimpleTextField, getSimpleTextProps } from '../../../UIElements/SimpleText/SimpleText'
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SimpleDateField, getSimpleDateProps } from '../../../UIElements/SimpleDate/SimpleDate';
import { getSearchParams } from '../../../../utils/search';
import { SimpleReactSelectField, getSimpleReactSelectProps } from '../../../UIElements/SimpleReactSelect/SimpleReactSelect';
import { checkFieldsByRegExp } from '../../../../utils/validate';

const SearchDialog = ({ ...props }) => {
    const initialSearchValues = props.searchFilter;
    const reactSelectStyles = {
        '&:hover': {
            borderColor: 'black'
        },
        'width': '100%',
        'borderColor': 'black'
    };
    const useMuiStyles = makeStyles(() => ({
        inputRoot: {
            width: '100%'
        },
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

    return <Dialog maxWidth='md' open={props.open}
        // onClose={() => props.handleClose()} //Закрытие по клику вне формы, пока убрал, требование заказчика. В остальных компонентах строку удалил
        fullWidth={true} >
        <DialogTitle disableTypography className={s.dialogTitle}>
            <div className={s.label}>
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
                    return checkFieldsByRegExp(['id', 'SystemSourceID'], /^[0-9a-fA-F]{24}$/, values, errors);
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
                                    {errors.id && errors.id === 'incorrectFormat' && <p className={s.error}>Неверный формат поля ID</p>}
                                    {errors.SystemSourceID && errors.SystemSourceID === 'incorrectFormat' && <p className={s.error}>Неверный формат поля Система-Источник.ID</p>}
                                    <div className={s.grid}>
                                        <label className={s.label}>ID</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('id', { ...fieldProps, values, errors, handleChange, placeholder: 'ID', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Статус</label>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('Status', ['Ошибка регистрации','Новый', 'Передан', 'Зарегистрирован', 'Отклонен', 'В работе', 'Выполнен', 'Закрыт'], { ...reactSelectProps })} /></div>
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
                                        <label className={s.label}>Контактное лицо. ФИО</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ContactFIO', { ...fieldProps, values, errors, handleChange, placeholder: 'Контактное лицо. ФИО', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Контактное лицо. Email</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ContactEmail', { ...fieldProps, values, errors, handleChange, placeholder: 'Контактное лицо. Email', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Контактное лицо. Телефон</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ContactPhone', { ...fieldProps, values, errors, handleChange, placeholder: 'Контактное лицо. Телефон', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    {/* <div className={s.grid}>
                                        <label className={s.label}>Краткое описание</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('DescriptionShort', { ...fieldProps, values, errors, handleChange, placeholder: 'Краткое описание', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <div className={s.grid}>
                                        <label className={s.label}>Полное описание</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('DescriptionFull', { ...fieldProps, values, errors, handleChange, placeholder: 'Полное описание', variant: 'outlined', size: 'small' })} /></div>
                                    </div> */}

                                    <label className={s.header}>Система-Источник</label>

                                    <div className={s.grid}>
                                        <label className={s.label}>Система. ID</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemSourceID', { ...fieldProps, values, errors, handleChange, placeholder: 'ID', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Система. Название</label>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('SystemSourceName', props.searchLists.systemList.data, { ...reactSelectProps })} /></div>
                                        
                                        {/* <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemSourceName', { ...fieldProps, values, errors, handleChange, placeholder: 'Название', variant: 'outlined', size: 'small' })} /></div> */}
                                    </div>

                                    {/* <div className={s.grid}>
                                        <label className={s.label}>Комментарий</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemSourceСomment', { ...fieldProps, values, errors, handleChange, placeholder: 'Комментарий', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <div className={s.grid}>
                                        <label className={s.label}>Вложения</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemSourceAttach', { ...fieldProps, values, errors, handleChange, placeholder: 'Вложения', variant: 'outlined', size: 'small' })} /></div>
                                    </div> */}

                                    <div className={s.grid}>
                                        <label className={s.label}>Код Объекта</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemSourceObjCode', { ...fieldProps, values, errors, handleChange, placeholder: 'Код Объекта', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <label className={s.header}>Система-Получатель</label>

                                    <div className={s.grid}>
                                        <label className={s.label}>Система. Название</label>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('SystemAddresseeID', props.searchLists.systemList.data, { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>СТП</label>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('SystemAddresseeSTPID', props.searchLists.stpList.data, { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Код Объекта</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemAddresseeObjCode', { ...fieldProps, values, errors, handleChange, placeholder: 'Код Объекта', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    {/* <div className={s.grid}>
                                        <label className={s.label}>Комментарий</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemAddresseeСomment', { ...fieldProps, values, errors, handleChange, placeholder: 'Комментарий', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Вложения</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemAddresseeAttach', { ...fieldProps, values, errors, handleChange, placeholder: 'Вложения', variant: 'outlined', size: 'small' })} /></div>
                                    </div>*/}
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
