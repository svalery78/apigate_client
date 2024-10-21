import Moment from 'moment';
import ExcelJS from 'exceljs/dist/es5/exceljs.browser';
import saveAs from 'file-saver';

// получение обьекта параметров запроса
export const getRequestParams = (searchParams = {}, page, pageSize) => {
  let params = {};

  params['searchParams'] = searchParams;

  if (page) {
    params['page'] = page;
  }

  if (pageSize) {
    params['size'] = pageSize;
  }

  return params;
};

// проверка обьекта на пустоту
export const isEmpty = (obj) => {
  if (!obj) {
    return true;
  }
  for (let key in obj) {
    return false;
  }

  return true;
}

// локализованная дата для списков
export const getLocalizedDate = function (date) {
  const localized = Moment(date)
  .local()
  .format('DD-MM-YYYY HH:mm:ss')

  return localized;
}

// локализованное время
export const getLocalizedTime = function (date) {
  const localized = Moment(date)
    .local()
    .format('HH:mm:ss');

  return localized;
}
//поиск уникальных значений
export const onlyUnique = function (value, index, self) { 
  return self.indexOf(value) === index;
}

//удаление свойств обьекта с пустыми строковыми значениями
export const clearObjEmptyStrings = function (obj) { 
   Object.keys(obj).forEach((k) => obj[k] === '' && delete obj[k]);
   return obj;
}

// выгрузка в excel 
export const excelLoad = (columns, selectedFlatRows) => {
  const ExcelJSWorkbook = new ExcelJS.Workbook();
  const worksheet = ExcelJSWorkbook.addWorksheet('export');
  const worksheetColumns = [];

  columns.forEach((column) => {
    worksheetColumns.push({
      header: column.Header,
      key: column.accessor,
      width: 10
    });
  })
  worksheet.columns = worksheetColumns;

  selectedFlatRows.forEach((row) => {
    let rowObj = {};
    columns.forEach((column) => rowObj[column.accessor] = column.func ? column.func(row.original[column.accessor]) : row.original[column.accessor]);
    worksheet.addRow(rowObj).commit();
  })

  const options = {
    formatterOptions: {
      delimiter: ';',
      quote: false,
      writeBOM: true
    },
  };
  
  ExcelJSWorkbook.csv.writeBuffer(options).then(function (buffer) {
    saveAs(
      new Blob([buffer], { type: 'text/csv;charset=utf-8' }),
      `export.csv`
    );
  });
}