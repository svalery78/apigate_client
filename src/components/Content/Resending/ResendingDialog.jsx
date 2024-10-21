import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import s from './ResendingDialog.module.css'
import { Formik, Form } from 'formik';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import { getSimpleReactSelectProps, SimpleReactSelectField } from '../../UIElements/SimpleReactSelect/SimpleReactSelect';
import { setFieldsAsRequired } from '../../../utils/validate';
import AddSettingTable from './AddSetting/AddSettingTable';

const ResendingDialog = ({ data, setFocusOnField, focusOnField, addSettingsLine, deleteSettingsLine, setFieldForAddSetting, ...props }) => {
    const reactSelectStyles = {
        '&:hover': {
            borderColor: 'black'
        },
        'width': '100%',
        'borderColor': 'black'
    };

    return <Dialog PaperProps={{ style: { overflowY: 'initial' } }} open={props.open} fullWidth={true} >
        <DialogTitle disableTypography className={s.dialogTitle}>
            <div className={s.gridTitle}>
                <label className={s.label}>ID</label>
                <label className={s.title}>{data.id}</label>
            </div>
            <IconButton onClick={() => props.onClose()}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'initial' }} >
            <Formik
                enableReinitialize
                initialValues={{
                    systemId: data.systemId,
                    systemName: data.systemName,
                    countTotal: data.countTotal,
                    settings: data.settings
                }}
                onSubmit={(values) => {
                    props.saveResending(values, data.id, props.refreshList)
                    props.onClose()
                }}
                validate={values => {
                    const errors = {};
                    
                    if (values.settings.find(setting => {
                        const numIsNotPositive = setting['count'] <= 0 || setting['interval'] <= 0;
                        const numIsEmpty = !setting['count'] || !setting['interval'];
                        const numIsNotRound = setting['count'] !== Math.round(setting['count']) || setting['interval'] !== Math.round(setting['interval']);

                        return numIsEmpty || numIsNotPositive || numIsNotRound;
                    })) {
                        errors.settings = '*';
                    }

                    return setFieldsAsRequired([], values, errors); //'systemId'
                }}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({
                    values,
                    errors,
                    setFieldValue
                }) => {
                    const reactSelectProps = {
                        setFieldValue: setFieldValue,
                        values: values,
                        customStyles: reactSelectStyles,
                        disabled: true
                    };
                    return <Form>
                        <div>
                            <OverlaySpinner active={props.isLoading}>
                                <div>
                                    {/*errors.systemId && errors.systemId === '*' && <p className={s.error}>Поле 'Система' не заполнено</p>*/}
                                    {errors.settings && errors.settings === '*' && <p className={s.error}>Поля 'Количество попыток' и 'Интервал (мин)' должны быть заполнены целым положительным значением</p>}
                                    <div className={s.grid}>
                                        <label className={s.fieldLabel}>Система</label>
                                        <p className={s.p}>*</p>
                                        <div className={s.field}><SimpleReactSelectField className={s.selectField} {...getSimpleReactSelectProps('systemId', props.searchLists.systemList.data, { ...reactSelectProps })} /></div>
                                    </div>
                                    <div className={s.totalCountGrid}>
                                        <label className={s.fieldLabel}>Количество попыток (общее): {data.countTotal}</label>
                                        <button className='btn btn-primary' type='button' onClick={() => addSettingsLine()}>Добавить</button>
                                    </div>
                                    <AddSettingTable
                                        data={data.settings}
                                        focusOnField={focusOnField}
                                        setFocusOnField={setFocusOnField}
                                        deleteSettingsLine={deleteSettingsLine}
                                        setFieldForAddSetting={setFieldForAddSetting}
                                        setFieldValue={setFieldValue}
                                        name={'settings'}
                                    />
                                    <div className={s.btnPanel}>
                                        <button className='btn btn-outline-secondary' type='submit' >
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

export default ResendingDialog;
