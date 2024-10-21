import React from 'react';
import s from './ObjectDialog.module.css'
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import { SimpleTextField, getSimpleTextProps } from '../../UIElements/SimpleText/SimpleText'
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getSimpleReactSelectProps, SimpleReactSelectField } from '../../UIElements/SimpleReactSelect/SimpleReactSelect'
import { setFieldsAsRequired } from '../../../utils/validate'
import { getLocalizedDate } from '../../../utils/custom';
import LinkButton from '../../UIElements/LinkButton/LinkButton';
import history from '../../../redux/history';
import JSONTree from 'react-json-tree';

const ObjectDialog = ({ data, ...props }) => {

    const reactSelectStyles = {
        '&:hover': {
            borderColor: 'black'
        },
        'width': '100%',
        'borderColor': 'grey'
    };
    const useMuiStyles = makeStyles(() => ({
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
    const muiStyles = useMuiStyles();
    const onClick = (id) => {
        props.setSearchFilter({ objectID: id });
        history.push('/rest');
    }

    return <Dialog maxWidth='md' open={props.open} fullWidth={true} >
        <DialogTitle disableTypography className={s.dialogTitle}>
            <div className={s.gridTitle}>
                <label className={s.label}>ID</label>
                <label className={s.title}>{data._id}</label>
            </div>
            <IconButton onClick={() => props.onClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflow: 'initial' }}>
            <div className={s.title}>
                <LinkButton text='REST запросы' noWrap onClick={() => onClick(data._id)} />
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    id: data._id,
                    date: getLocalizedDate(data.date),
                    Status: data.Status,
                    DescriptionShort: data.DescriptionShort,
                    DescriptionFull: data.DescriptionFull,
                    ContactFIO: data.ContactFIO,
                    ContactEmail: data.ContactEmail,
                    ContactPhone: data.СontactPhone,

                    SystemSourceAttach: data.SystemSourceAttach,
                    SystemSourceID: data.SystemSourceID,
                    SystemSourceName: data.SystemSourceName,
                    SystemSourceObjCode: data.SystemSourceObjCode,
                    SystemSourceСomment: data.SystemSourceСomment,

                    SystemAddresseeID: data.SystemAddresseeID,
                    SystemAddresseeSTPID: data.SystemAddresseeSTPID,
                    SystemAddresseeObjCode: data.SystemAddresseeObjCode,
                    SystemAddresseeСomment: data.SystemAddresseeСomment,
                    SystemAddresseeAttach: data.SystemAddresseeAttach,

                    service: data.service,
                    Resolution: data.Resolution,
                    ResolutionType: data.ResolutionType,
                    CustomFields: data.CustomFields,
                }}
                onSubmit={(values) => {
                    props.saveObject(values, data._id, props.refreshList)
                    props.onClose()
                }}
                validate={values => {
                    const errors = {};
                    const status = values.Status === 'Отклонен'
                    const requredFields = !status ? ['Status'] : ['SystemAddresseeСomment']
                    return setFieldsAsRequired(requredFields
                        // 'id', 'date', 'Status', 'DescriptionShort',
                        // 'DescriptionFull', 'ContactFIO', 'ContactEmail'||'ContactPhone',
                        // 'SystemSourceID', 'SystemSourceName', 'SystemSourceObjCode',
                        // 'SystemAddresseeID', 'SystemAddresseeSTPID',
                        // 'SystemAddresseeObjCode', //TODO: Да, при переводе в статус «Зарегистрирован»
                        // 'SystemAddresseeСomment',  
                        , values, errors);
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
                        customStyles: reactSelectStyles,
                        disabled: true
                    };
                    const fieldProps = {
                        values: props.values,
                        handleChange: props.handleChange,
                        styles: { height: '38px' },
                        muiStyles,
                        disabled: true
                    };

                    return <Form>
                        <div>
                            <OverlaySpinner active={props.isLoading}>
                                <div>
                                    {errors.id && errors.id === '*' && <p className={s.error}>Поле 'ID' не заполнено</p>}
                                    {errors.date && errors.date === '*' && <p className={s.error}>Поле 'Дата' не заполнено</p>}
                                    {errors.Status && errors.Status === '*' && <p className={s.error}>Поле 'Статус' не заполнено</p>}
                                    {errors.DescriptionShort && errors.DescriptionShort === '*' && <p className={s.error}>Поле 'Описание. Краткое' не заполнено</p>}
                                    {errors.DescriptionFull && errors.DescriptionFull === '*' && <p className={s.error}>Поле 'Описание. Полное' не заполнено</p>}
                                    {errors.ContactFIO && errors.ContactFIO === '*' && <p className={s.error}>Поле 'Контактное лицо. ФИО' не заполнено</p>}
                                    {errors.ContactEmail && errors.ContactEmail === '*' && <p className={s.error}>Поле 'Контактное лицо. Email' не заполнено</p>}
                                    {errors.ContactPhone && errors.ContactPhone === '*' && <p className={s.error}>Поле 'Контактное лицо. Телефон' не заполнено</p>}
                                    {errors.SystemSourceID && errors.SystemSourceID === '*' && <p className={s.error}>Поле 'Система. ID' не заполнено</p>}
                                    {errors.SystemSourceName && errors.SystemSourceName === '*' && <p className={s.error}>Поле 'Система. Название' не заполнено</p>}
                                    {errors.SystemSourceObjCode && errors.SystemSourceObjCode === '*' && <p className={s.error}>Поле 'Код Объекта' не заполнено</p>}
                                    {errors.SystemAddresseeID && errors.SystemAddresseeID === '*' && <p className={s.error}>Поле 'Система. Название' не заполнено</p>}
                                    {errors.SystemAddresseeSTPID && errors.SystemAddresseeSTPID === '*' && <p className={s.error}>Поле 'СТП' не заполнено</p>}
                                    {errors.SystemAddresseeObjCode && errors.SystemAddresseeObjCode === '*' && <p className={s.error}>Поле 'Код Объекта' не заполнено</p>}
                                    {values.Status === 'Отклонен' && errors.SystemAddresseeСomment && errors.SystemAddresseeСomment === '*' && <p className={s.error}>Поле 'Комментарий' не заполнено</p>}
                                    <div className={s.grid}>
                                        <label htmlFor="date">Дата</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('date', { ...fieldProps, values, errors, handleChange, placeholder: 'Дата', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <div className={s.grid}>
                                        <label htmlFor="Status">Статус</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField}
                                            {...getSimpleReactSelectProps('Status', ['Ошибка регистрации', 'Новый', 'Передан', 'Зарегистрирован', 'Отклонен', 'В работе', 'Выполнен', 'Закрыт'], { ...reactSelectProps, disabled: false })} /></div>
                                    </div>

                                    <label className={s.label}>Данные Объекта (Обращения)</label>

                                    <div className={s.grid}>
                                        <label htmlFor="DescriptionShort">Описание. Краткое</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('DescriptionShort', { ...fieldProps, values, errors, handleChange, placeholder: 'Описание. Краткое', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <div className={s.grid}>
                                        <label htmlFor="DescriptionFull">Описание. Полное</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('DescriptionFull', { ...fieldProps, values, errors, handleChange, placeholder: 'Описание. Полное', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <div className={s.grid}>
                                        <label htmlFor="ContactFIO">Контактное лицо. ФИО</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ContactFIO', { ...fieldProps, values, errors, handleChange, placeholder: 'Контактное лицо. ФИО', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <div className={s.grid}>
                                        <label htmlFor="ContactEmail">Контактное лицо. Email</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ContactEmail', { ...fieldProps, values, errors, handleChange, placeholder: 'Контактное лицо. Email', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <div className={s.grid}>
                                        <label htmlFor="ContactPhone">Контактное лицо. Телефон</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ContactPhone', { ...fieldProps, values, errors, handleChange, placeholder: 'Контактное лицо. Телефон', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <label className={s.label}>Система-Источник</label>

                                    <div className={s.grid}>
                                        <label htmlFor="SystemSourceID">Система. ID</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemSourceID', { ...fieldProps, values, errors, handleChange, placeholder: 'ID', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <div className={s.grid}>
                                        <label htmlFor="SystemSourceName">Система. Название</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemSourceName', { ...fieldProps, values, errors, handleChange, placeholder: 'Название', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <div className={s.grid}>
                                        <label htmlFor="SystemSourceObjCode">Код Объекта</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemSourceObjCode', { ...fieldProps, values, errors, handleChange, placeholder: 'Код Объекта', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <div className={s.grid}>
                                        <label htmlFor="SystemSourceСomment">Комментарий</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemSourceСomment', { ...fieldProps, values, errors, handleChange, placeholder: 'Комментарий', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label htmlFor="SystemSourceAttach">Вложения</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemSourceAttach', { ...fieldProps, values, errors, handleChange, placeholder: 'Вложения', variant: 'outlined', size: 'small' })} /></div>
                                    </div>

                                    <label className={s.label}>Система-Получатель</label>

                                    <div className={s.grid}>
                                        <label htmlFor="SystemAddresseeID">Система. Название</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('SystemAddresseeID', props.searchLists.systemList.data, { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label htmlFor="SystemAddresseeSTPID">СТП</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('SystemAddresseeSTPID', props.searchLists.stpList.data, { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label htmlFor="SystemAddresseeObjCode">Код Объекта</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemAddresseeObjCode', { ...fieldProps, values, errors, handleChange, placeholder: 'Код Объекта', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label htmlFor="SystemAddresseeСomment">Комментарий </label>
                                        <p className={s.p}>{values.Status === 'Отклонен' ? '*' : ''}</p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemAddresseeСomment', { ...fieldProps, disabled: (values.Status === 'Отклонен') ? false : true, values, errors, handleChange, placeholder: 'Комментарий', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    {/* <div className={s.grid}>
                                        <label htmlFor="SystemAddresseeAttach">Вложения</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('SystemAddresseeAttach', { ...fieldProps, values, errors, handleChange, placeholder: 'Вложения', variant: 'outlined', size: 'small' })} /></div>
                                    </div> */}
                                    <div className={s.grid}>
                                        <label htmlFor="service">Сервис</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('service', { ...fieldProps, values, errors, handleChange, placeholder: 'Сервис', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label htmlFor="Resolution">Решение заявки</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('Resolution', { ...fieldProps, values, errors, handleChange, placeholder: 'Решение заявки', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label htmlFor="ResolutionType">Код решения</label>
                                        <p className={s.p}></p>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ResolutionType', { ...fieldProps, values, errors, handleChange, placeholder: 'Код решения', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Доп. поле</label>
                                        <p className={s.p}></p>
                                        <div id='data-CustomFields' className={s.field}>
                                            <JSONTree data={values.CustomFields || {}} />
                                        </div>
                                    </div>
                                    <div className={s.btnPanel}>
                                        <button className="btn btn-outline-secondary" type="submit"  >
                                            Сохранить
                                        </button>
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

export default ObjectDialog;
