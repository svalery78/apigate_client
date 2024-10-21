import React from 'react';
import s from './OverlaySpinner.module.css';
import LoadingOverlay from 'react-loading-overlay';
import CircularProgressLoad from '../CircularProgressLoad/CircularProgressLoad';

const OverlaySpinner = (props) => {
    const textElement = !props.component ? (props.text || <div className={s.spinnerText}>Идет загрузка данных, пожалуйста, подождите...</div>) : '';
    const componentElement = props.component || '';
    const needSpinner = props.needSpinner !== false ? <div><CircularProgressLoad size={30} color='white' /></div> : false;

    return <LoadingOverlay
        className={s.spinner}
        active={props.active}
        spinner={needSpinner}
        text={textElement}
        styles={{
            overlay: (base) => ({
                ...base,
                ...props.styles
            })
        }}
    >
        {componentElement}
        {props.children}
    </LoadingOverlay>
}

export default OverlaySpinner;