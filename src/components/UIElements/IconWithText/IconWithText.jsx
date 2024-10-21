import React from 'react';
import s from './IconWithText.module.css';

const IconWithText = (props) => {
    return <div className={s.iconWithTextContainer} onClick={props.onClick}>
        <div className={s.iconContainer}>
            {props.children}
        </div>
        <div className={s.labelForIcon}>{props.label}</div>
    </div>
}

export default IconWithText;