import React from 'react';
import s from './Status.module.css';
import circleRed from './circleRed.png';
import circleGrey from './circleGrey.png';
import circleGreen from './circleGreen.png';
import circleYellow from './circleYellow.png';

const Reboot = (props) => {
  var state = props.state || null;

  function getImg(state) {
    var img = null;

    switch (state) {
      case 'SUCCESS':
        img = <img className={s.circle} src={circleGreen} alt='Выполнен' />;
        break;
      case 'ERROR':
        img = <img className={s.circle} src={circleRed} alt='Ошибка' />;
        break;
      case 'SENDING':
        img = <img className={s.circle} src={circleYellow} alt='В процессе' />;
        break;
      case 'IRRELEVANT':
        img = <img className={s.circle} src={circleGrey} alt='Неактуальный' />;
        break;
      default:
        img = <img className={s.circle} src={circleGrey} alt='Не осуществлялся' />;
        break;
    }

    return img;
  }

  return (
    <span className={s.circle}>
      {getImg(state)}
    </span>
  );
};

export default Reboot;
