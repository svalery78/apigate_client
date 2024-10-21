import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useTable } from 'react-table';
import SettingDialogContainer from './SettingDialogContainer'
import SearchDialogContainer from './Search/SearchDialogContainer';
import s from './SettingList.module.css'
import { isEmpty } from '../../../utils/custom';
import { getSearchParams } from '../../../utils/search';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import { ReactComponent as RefreshIcon } from '../../../assets/RefreshIcon.svg';

const SettingList = (props) => {
  const [showOpenDialog, setShowOpenDialog] = useState(false)
  const [showOpenSearch, setShowOpenSearch] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const searchParams = getSearchParams('setting', props.searchFilter);
    props.retrieveSetting(searchParams, props.list.page, pageSize)
  }, [props.searchFilter, props.list.page, pageSize]);

  useEffect(() => {
    if (props.needRefresh) {
      const searchParams = getSearchParams('setting', props.searchFilter);
      props.retrieveSetting(searchParams, props.list.page, pageSize);
      props.setNeedRefresh(false);
    }
  }, [props.needRefresh])

  const handlePageChange = (event, value) => {
    props.setCurrentPage(value);
  };

  const onRowClick = (id) => {
    props.getSetting(id);
    setShowOpenDialog(true);
  };

  const refreshList = () => {
    props.setNeedRefresh(true);
  };

  const columns = useMemo(
    () => [
      // { Header: 'ID', accessor: '_id' },
      { Header: 'Параметр', accessor: 'name' },
      { Header: 'Значение', accessor: 'value' },
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
    <OverlaySpinner active={props.list.isLoading}>
      <div className='list row w-25'><h5>Конфигурация</h5>
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
          <IconButton onClick={refreshList}>
            <RefreshIcon />
          </IconButton>
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
        <div className={s.list + 'col-md-8 list'}>
          <div className='mt-2'>
            <Pagination
              className='pagination my-2'
              count={props.list.count}
              page={props.list.page}
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
                      {column.render('Header')}
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
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </OverlaySpinner>
    {showOpenDialog && <SettingDialogContainer
      open={showOpenDialog}
      setNeedRefresh={props.setNeedRefresh}
      handleClose={() => setShowOpenDialog(false)}
    />}
    {showOpenSearch && <SearchDialogContainer
      open={showOpenSearch}
      handleClose={() => setShowOpenSearch(false)}
      setSearchFilter={removeFilter}
    />}
  </div>
};

export default SettingList;