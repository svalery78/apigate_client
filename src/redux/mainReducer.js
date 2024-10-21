import shortid from 'shortid';

const initialState = {
  alertShow: false,
  alertText: '',
  alertSeverity: 'success',
  alertTitle: 'Успех',
  alertDate: null
};

const mainReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'APIGATE/MAIN/ALERT/SET_INFO':
      let text = action.value.text;
      if (typeof text === 'string') { 
        text = <>{text.split('\n').map(item => <div key={shortid.generate()}>{item}</div>)}</>; 
      } else if (typeof text === 'object' && text !== null) { 
        text = <>{JSON.stringify(text)}</> 
      } else if (!text) { text = <>Сообщение отсутствует</>; }
      //const formattedText = <>{text.split('\n').map(item => <div key={shortid.generate()}>{item}</div>)}</>; //Разбиваем на строчки по \n
      
      return {
        ...state,
        alertShow: true,
        alertText: text,
        alertSeverity: action.value.severity || 'success', //success, error, warning, info
        alertTitle: action.value.title || 'Успех',
        alertDate: action.value.date
      };
    case 'APIGATE/MAIN/ALERT/CLOSE':
      return {
        ...state,
        alertShow: false
      };
    default:
      return state;
  }
}

const setAlertInfo = (value) => ({ type: 'APIGATE/MAIN/ALERT/SET_INFO', value });
export const closeAlert = () => ({ type: 'APIGATE/MAIN/ALERT/CLOSE' });
export const showAlert = (value) => (dispatch) => {
  value.text = value.text.replace(/Error: /g, '');
  value.date = new Date();
  dispatch(setAlertInfo(value));
};

export default mainReducer;