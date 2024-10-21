import React from 'react';
import { Alert as MuiAlert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import s from './Alert.module.css';
import { getLocalizedTime } from '../../../utils/custom';

const Alert = (props) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.handleClose();
  };

  //severity value list = ['error', 'warning', 'info', 'success']
  return <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert variant='filled' severity={props.severity} onClose={handleClose} >
          <AlertTitle>{getLocalizedTime(props.date)} {props.title}</AlertTitle>
          <div className={s.message}>{props.description}</div>
        </MuiAlert>
  </Snackbar>;
}

export default Alert;