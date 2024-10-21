import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useTable } from 'react-table';
import ObjectDialogContainer from './ObjectDialogContainer'
import SearchDialogContainer from './Search/SearchDialogContainer';
import s from './ObjectList.module.css'
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { isEmpty, getLocalizedDate } from '../../../utils/custom';
import { getSearchParams } from '../../../utils/search';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import { ReactComponent as RefreshIcon } from '../../../assets/RefreshIcon.svg';

const ObjectList = (props) => {
  const [showOpenDialog, setShowOpenDialog] = useState(false)
  const [showOpenSearch, setShowOpenSearch] = useState(false);
  // const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const searchParams = getSearchParams('object', props.searchFilter);
    props.retrieveObject(searchParams, props.list.page, pageSize)
  }, [props.searchFilter, props.list.page, pageSize])

  useEffect(() => {
    if (props.needRefresh) {
      const searchParams = getSearchParams('object', props.searchFilter);
      props.retrieveObject(searchParams, props.list.page, pageSize);
      props.setNeedRefresh(false);
    }
  }, [props.needRefresh])

  const handlePageChange = (event, value) => {
    props.setCurrentPage(value);
  };

  const onRowClick = (id) => {
    props.getObject(id);
    setShowOpenDialog(true);
  };
  const refreshList = () => {
    props.setNeedRefresh(true);
  };

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: '_id' },
      { Header: 'Статус', accessor: 'Status' },
      {
        Header: 'Дата', accessor: d => {
          return getLocalizedDate(d.date).replace(' ', '\u00A0');
        }
      },
      // { Header: 'СИ-ID', accessor: 'SystemSourceID' },
      { Header: 'СИ-Название', accessor: 'SystemSourceName' },
      { Header: 'СИ-Код объекта', accessor: 'SystemSourceObjCode' },
      // { Header: 'СИ-Комментарий', accessor: 'SystemSourceСomment' },
      // { Header: 'СИ-Вложения', accessor: 'SystemSourceAttach', Cell: props => <div title={props.row.original.SystemSourceAttach}>{props.row.original.SystemSourceAttach}</div> },

      // { Header: 'СП', accessor: 'SystemAddresseeName' },
      { Header: 'СП-СТП', accessor: 'SystemAddresseeSTPName' },
      { Header: 'СП-Код Объекта', accessor: 'SystemAddresseeObjCode' },
      // { Header: 'СП-Комментарий', accessor: 'SystemAddresseeСomment' },
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
      <div className='list row w-100'><h5>Объект</h5>
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
              page={ props.list.page }
              siblingCount={1}
              boundaryCount={1}
              variant='outlined'
              shape='rounded'
              onChange={handlePageChange}
            />
          </div>

          <table className={'table table-striped table-bordered w-init ' + s.mainTable} {...getTableProps()} >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} height='40px'>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} height='40px'>
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
                        <td {...cell.getCellProps()}>
                          <div className={s.tableCell}>
                            {cell.render('Cell')}
                          </div>
                        </td>
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
    {showOpenDialog && <ObjectDialogContainer 
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

export default ObjectList;
