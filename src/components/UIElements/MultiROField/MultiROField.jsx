import React from 'react';
import s from './MultiROField.module.css';
import cn from 'classnames';

const MultiROField = (props) => {
    return <div className={cn({ [s.multylineFieldContainer]: true, [props.className]: Boolean(props.className) })}>
        <span className={s.multiFieldText}>{props.value}</span>
    </div>
}

export default MultiROField;