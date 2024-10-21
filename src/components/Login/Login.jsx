import React from 'react';
import s from './Login.module.css';
import { Formik, ErrorMessage } from 'formik';
import { Card, TextField } from '@material-ui/core';
import SimpleButton from '../UIElements/SimpleButton/SimpleButton'
import LoginImage from '../ImagesComponents/LoginImage';
import OverlaySpinner from '../UIElements/OverlaySpinner/OverlaySpinner';

const Login = (props) => {
  return <div className={s.main}>
    <Formik
      initialValues={{ login: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.login) {
          errors.login = ' Заполните это поле';
        }
        if (!values.password) {
          errors.password = ' Заполните это поле';
        }
        return errors;
      }}
      onSubmit={(values) => {
        props.signinUser(values)
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit
      }) => {
        return <form className={s.form} onSubmit={handleSubmit}>
          <Card className={s.loginFormContainer}>
            <OverlaySpinner active={props.userIsLogging} text='Осуществление входа в систему'>
            <div className={s.grid}>
              <div className={s.image}> <LoginImage className={s.login} /> </div>
              <div  >
                <div className={s.title}>{"API Gate"}</div>
                <div className={s.gridLabel}>
                  <div className={s.label}>
                    Логин:
                  </div>
                  <div className={s.formImputs} >
                    <TextField color='primary' name='login' placeholder='логин' variant='outlined' size='small'
                      //required={true}
                      value={values.login}
                      error={Boolean(errors.login)}
                      onChange={handleChange}
                    />
                    <ErrorMessage name='login' component='span' className={s.error} />
                  </div>
                </div>
                <div className={s.gridLabel}>
                  <div className={s.label}>
                    Пароль:
                  </div>
                  <div className={s.formImputs} >
                    <TextField name='password' placeholder='пароль' type='password' variant='outlined' size='small'
                      //required={true}
                      value={values.password}
                      error={Boolean(errors.password)}
                      onChange={handleChange}
                    />
                    <ErrorMessage name='password' component='span' className={s.error} />
                  </div>
                </div>
                <div className={s.btnContainer}>
                  <SimpleButton type='submit' label='Вход' />
                </div>
              </div>

            </div>
            </OverlaySpinner>
          </Card>
        </form>
      }}
    </Formik>
  </div>
}

export default Login;