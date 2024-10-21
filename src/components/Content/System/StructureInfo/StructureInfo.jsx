import React from 'react';
import Base from './Base/Base';
//import Telegram from './Telegram/Telegram';

const StructureInfo = (props) => {
    if (!props.values.type || props.values.type === '') {
        return <div />;
    }

    switch (props.values.DataStructure) {
        case 'telegram':
            return <div />;
            //return <Telegram {...props} />;
        default:
             return <Base {...props} />;
            //return <div />;
    }
}

export default StructureInfo;
