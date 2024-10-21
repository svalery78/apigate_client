import React from 'react';
import s from './LinkButton.module.css';

const LinkButton = (props) => {
    const textStyles = {
        whiteSpace: props.noWrap ? 'nowrap' : 'normal'
    }

    const btnStyles = {
        color: props.color || 'var(--colorLinkButtonBlue)',
        textDecoration: props.underline ? 'underline' : 'none'
    }

    const type = props.type || 'button';

    return <button type={type} className={s.btn} name={props.name} onClick={props.onClick} style={btnStyles}>
        <div className={s.btnText} style={textStyles} title={props.text}>{props.text}</div>
    </button>;
}

export default LinkButton;