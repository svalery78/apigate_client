export const httpErrorHandler = (statusCode, messageText) => {
  if (messageText) { throw messageText; }
  if (statusCode !== 200 && statusCode !== 201) { throw new Error(getHttpError(statusCode)); }
}

export const smAPIErrorHandler = (data) => {
  if (!data.data || data.status !== 'SUCCESS') { throw new Error(data.message || 'SM API ERROR: Неизвестная ошибка (FRONT)'); }
}

const getHttpError = (statusCode) => {
  switch (statusCode) {
    case 204:
      return 'Данные не найдены';
    default:
      return `Неопознанная ошибка (Код ошибки: ${statusCode})`;
  }
}