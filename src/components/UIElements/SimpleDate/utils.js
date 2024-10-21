//Формат даты из DatePicker к формату, понятному SM
export const formatDatetimeLocalToSMDate = (datetime) => {
    return datetime ? `${datetime.slice(8, 10)}/${datetime.slice(5, 7)}/${datetime.slice(2, 4)} ${datetime.slice(11, 13)}:${datetime.slice(14, 16)}` : datetime;
}