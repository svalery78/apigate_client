import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';


const CircularProgressLoad = (props) => {
    const useCircularStyles = makeStyles(() => ({
        colorPrimary: {
            color: props.color || 'primary' 
        },
    }));

    const circularStyles = useCircularStyles(props.color);
    return <CircularProgress size={props.size || 15} classes={circularStyles} className={cn({[props.className]: Boolean(props.className)})} />
}
export default CircularProgressLoad;