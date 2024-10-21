import React, { useState, useEffect, useMemo } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useTable } from "react-table";
import "react-table/react-table.css";
import SettingDialogContainer from './SettingDialogContainer'
import SearchDialogContainer from './Search/SearchDialogContainer';
import s from './SettingList.module.css'
import { isEmpty } from '../../../utils/custom';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const CustomTableSettingList = ({ record, ...props }) => {
  const [showOpenDialog, setShowOpenDialog] = useState(false)
  const [showOpenSearch, setShowOpenSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
//TODO: перерисовывать компонент после добавления новой записи
  useEffect(() => {
    props.retrieveSetting(props.searchFilter, page, pageSize)
  }, [props.searchFilter, page, pageSize])

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onRowClick = (id) => {
    props.getSetting(id);
    setShowOpenDialog(true);
  };

  const columns = useMemo(
    () => [
      // { Header: "ID", accessor: "_id" },
      { width:'20', Header: "Название", accessor: "name", width: 100 },
      { Header: "Value", accessor: "value", width: 100 },
    ], []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: props.list.data
  });
  const removeFilter = () => {
    props.setSearchFilter({});
  };

  return <div className={s.container}>
    <div className="list row"><h5>Настройки</h5>
      <div className={s.buttonsGrid}>
        <div className='input-group mb-2'>
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={() => setShowOpenSearch(true)}
            >
              Поиск
            </button>
          </div>
        </div>
        <div className='input-group mb-2'>
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={props.onCreateClick}>
              Создать
            </button>
          </div>
        </div>

        <div className={s.filter}>
          {isEmpty(props.searchFilter) ? null :
            <>
              {'Фильтр'}
              <IconButton onClick={removeFilter}>
                <CloseIcon />
              </IconButton>
              {JSON.stringify(props.searchFilter)}
            </>
          }
        </div>
      </div>
      <div className={s.list + "col-md-8 list"}>
        <div className="mt-2">
          <Pagination
            className='pagination my-2'
            count={props.list.count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant='outlined'
            shape='rounded'
            onChange={handlePageChange}
          />
        </div>

        <table
          className={s.mainTable + ' table table-striped table-bordered w-init'}
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} onClick={() => onRowClick(row.original._id)}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    {showOpenDialog && <SettingDialogContainer data={record}
      open={showOpenDialog}
      handleClose={() => setShowOpenDialog(false)}
    />}
    {showOpenSearch && <SearchDialogContainer
      open={showOpenSearch}
      handleClose={() => setShowOpenSearch(false)}
      setSearchFilter={removeFilter}
    />}
  </div>
};

export default CustomTableSettingList;