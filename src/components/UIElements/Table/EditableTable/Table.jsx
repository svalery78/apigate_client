import React from 'react';
import { useTable } from 'react-table';
import s from './Table.module.css';
import Input from '../../Input';

function Table({ columns, data, setFieldForInput, inputType }) { //rowKey, 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
    //getRowId: React.useCallback(row => row[rowKey], [rowKey])
  });
  const setFieldForInputOnLine = (name, value, index) => {
    setFieldForInput(name, value, index);
  }

  return (
    <div >
    <table {...getTableProps()} className={s.table}>
      <thead >
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className={s.tr}>
            {headerGroup.headers.map(column => (
              <th className={s.th} {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                const el = (cell.column.id === 'actions' || cell.column.id === 'number') ? cell.render('Cell') :
                    <Input 
                      id={`data[${cell.row.index}].${cell.column.id}`} 
                      key={`data[${cell.row.index}].${cell.column.id}`} 
                      name={`${cell.column.id}`}
                      data-index={index}
                      value={data[cell.row.index][cell.column.id]}
                      type={cell.column.type}
                      setFieldForInput={setFieldForInputOnLine}
                    />
                return (
                  <td {...cell.getCellProps()}>{el}</td>
                )}
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}

export default Table;
