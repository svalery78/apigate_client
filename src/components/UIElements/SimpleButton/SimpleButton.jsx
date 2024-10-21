import React from 'react';
import s from './SimpleButton.module.css';
import cn from 'classnames';

const SimpleButton = (props) => {
    const sBtn = {
        [props.className]: props.className ? true : false,
        [s.btn]: true,
    }

    const sBtnText = {
        [s.btnText]: true,
        [s.noWrap]: Boolean(props.noWrap),
    }

    return <button type={props.type || 'button'} className={cn(sBtn)} onClick={props.onClick}>
        <div className={cn(sBtnText)}>{props.label}</div>
    </button>;
}

export default SimpleButton;