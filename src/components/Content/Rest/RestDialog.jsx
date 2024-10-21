import React from 'react';
import s from './RestDialog.module.css';
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import JSONTree from 'react-json-tree';
import CloseIcon from '@material-ui/icons/Close';
import { getLocalizedDate } from '../../../utils/custom';
import { SimpleReactSelectField, getSimpleReactSelectProps } from '../../UIElements/SimpleReactSelect/SimpleReactSelect';
import { SimpleTextField, getSimpleTextProps } from '../../UIElements/SimpleText/SimpleText';

const RestDialog = ({ data, ...props }) => {
    const saveRest = (values) => {
        props.saveRest(values, data._id)
    }

    const reactSelectStyles = {
        '&:hover': {
            borderColor: 'gray'
        },
        'width': '100%'
    };
    const useMuiStyles = makeStyles(() => ({
        root: {
            '& .MuiOutlinedInput-root': {
                borderRadius: 3
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
        <DialogTitle style={{ overflowY: 'initial' }} disableTypography className={s.dialogTitle}>
            <div className={s.grid}>
                <label className={s.label}>ID</label>
                <span className={s.label}>{data._id}</span>
            </div>
            <IconButton onClick={() => props.handleClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Formik
                enableReinitialize
                initialValues={{
                    objectID: data.objectID,
                    type: data.type,
                    data: getLocalizedDate(data.data),
                    status: data.status,
                    url: data.url,
                    request: data.request,
                    result: data.result,
                    sendTriesCount: data.sendTriesCount,
                    systemId: data.systemId,
                    tableName: data.tableName,
                    info: data.info,
                    ip: data.ip
                }}
                onSubmit={(values) => {
                    saveRest(values);
                    props.onClose()
                }}
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
                        disabled: true,
                        muiStyles
                    };

                    const handleContextmenu = (e) => {
                        if (e.type === 'contextmenu') {
                            e.preventDefault();
                            try {
                                // console.log(JSON.stringify(e.currentTarget.id == 'data-request' ? values.request: values.result));
                                navigator.clipboard.writeText(JSON.stringify(values.request))
                            } catch (e) { }
                        }
                    }

                    return <Form>
                        <div>
                            <OverlaySpinner active={props.isLoading}>
                                <div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Объект.ID</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('objectID', { ...fieldProps, values, errors, handleChange, placeholder: 'Объект.ID', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>IP</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('ip', { ...fieldProps, values, errors, handleChange, placeholder: 'IP', variant: 'outlined', size: 'small' })} /></div>
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
                                        <label className={s.label}>Дата</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('data', { ...fieldProps, values, errors, handleChange, placeholder: 'Дата', variant: 'outlined', size: 'small' })} /></div>
                                        {/* <div className={s.field}><SimpleDateField {...getSimpleDateProps('data', { ...dateProps, withTime: true })} /></div> */}
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Статус</label>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('status', ['SUCCESS', 'ERROR', 'SENDING'], { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Url</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('url', { ...fieldProps, values, errors, handleChange, placeholder: 'Url', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Запрос</label>
                                        <div onContextMenu={handleContextmenu} id='data-request' className={s.field}>
                                            <JSONTree data={values.request || {}} />
                                        </div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Ответ</label>
                                        <div onContextMenu={handleContextmenu} id='data-result' className={s.field}>
                                            <JSONTree data={values.result || {}} />
                                        </div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Количество попыток отправки</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('sendTriesCount', { ...fieldProps, values, errors, handleChange, placeholder: 'Количество попыток отправки', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Система</label>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('systemId', props.searchLists.systemList.data, { ...reactSelectProps })} disabled={true} /></div>
                                    </div>
                                    <div className={s.grid}>
                                        <label className={s.label}>Комментарий</label>
                                        <div className={s.field}><SimpleTextField {...getSimpleTextProps('info', { ...fieldProps, values, errors, handleChange, placeholder: 'Комментарий', variant: 'outlined', size: 'small' })} /></div>
                                    </div>
                                </div>
                                {/* <button type='submit' className='badge badge-success'>
                                    Сохранить
                                </button> */}
                            </OverlaySpinner>
                        </div>
                    </Form >
                }}
            </Formik >
        </DialogContent>
    </Dialog>
};

export default RestDialog;
