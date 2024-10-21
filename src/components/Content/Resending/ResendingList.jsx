import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useTable, useRowSelect } from 'react-table';
import ResendingDialogContainer from './ResendingDialogContainer'
//import SearchDialogContainer from './Search/SearchDialogContainer';
//import { getSearchParams } from '../../../utils/search';
import s from './ResendingList.module.css'
import { IconButton } from '@material-ui/core';
import OverlaySpinner from '../../UIElements/OverlaySpinner/OverlaySpinner';
import { ReactComponent as RefreshIcon } from '../../../assets/RefreshIcon.svg';
import cn from 'classnames';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    const customClick = (event) => {
      event.stopPropagation();
    }

    return (
      <>
        <input type='checkbox' ref={resolvedRef} {...rest} onClick={customClick} />
      </>
    )
  }
)

const ResendingList = (props) => {
  const [showOpenDialog, setShowOpenDialog] = useState(false)
  //const [showOpenSearch, setShowOpenSearch] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const searchParams = {}; //getSearchParams('resending', props.searchFilter);
    props.retrieveResending(searchParams, props.list.page, pageSize)
  }, [props.searchFilter, props.list.page, pageSize]);

  useEffect(() => {
    if (props.needRefresh) {
      const searchParams = {}; //getSearchParams('resending', props.searchFilter);
      props.retrieveResending(searchParams, props.list.page, pageSize);
      props.setNeedRefresh(false);
    }
  }, [props.needRefresh])

  const handlePageChange = (event, value) => {
    props.setCurrentPage(value);
  };

  const onRowClick = (id) => {
    props.getResending(id);
    setShowOpenDialog(true);
  };

  const refreshList = () => {
    props.setNeedRefresh(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Система',
        accessor: d => {
          return d['systemName'] ? d['systemName'] : 'по умолчанию';
        }
      },
    ], []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // selectedFlatRows,
    // toggleAllRowsSelected
  } = useTable({
    columns,
    data: props.list.data
  },
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        {
          id: 'selection',
          disableResizing: true,
          Header: ({ getToggleAllRowsSelectedProps }) => {
            return <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          },
          Cell: ({ row }) => {
            return <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          },
        },
        ...columns,
      ])
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        const selectionGroupHeader = headerGroups[0].headers[0]
        selectionGroupHeader.canResize = false
      })
    });

  // const removeFilter = () => {
  //   props.setSearchFilter({});
  // };

  return <div className={s.container}>
    <OverlaySpinner active={props.list.isLoading}>
      <div className='list row w-100'><h5>Повторная отправка</h5>
        <div className={s.buttonsGrid}>
          {/*<div className='input-group mb-2'>
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
          </div>*/}
          <IconButton onClick={refreshList}>
            <RefreshIcon />
          </IconButton>
          {/*<div className={s.filter}>
            {isEmpty(props.searchFilter) ? null :
              <>
                {'Фильтр'}
                <IconButton onClick={removeFilter}>
                  <CloseIcon />
                </IconButton>
                {JSON.stringify(props.searchFilter)}
              </>
            }
          </div>*/}
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
            className={(props.list.data.length === 0) ? ' table table-striped table-bordered  ' + s.mainTable : ' table table-striped table-bordered  '} //скукоживалась таблица, если поиск не дал результатов
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
                        <td {...cell.getCellProps()}>
                          <div className={cn({ [s.tableCell]: true, [s.dataCell]: cell.column.id !== 'selection' })} >
                            {cell.render('Cell')}
                          </div>
                        </td>
                      );
                      // return (
                      //   <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      // );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </OverlaySpinner>
    {showOpenDialog && <ResendingDialogContainer
      open={showOpenDialog}
      setNeedRefresh={props.setNeedRefresh}
      handleClose={() => setShowOpenDialog(false)}
    />}
    {/*showOpenSearch && <SearchDialogContainer
      open={showOpenSearch}
      handleClose={() => setShowOpenSearch(false)}
      setSearchFilter={removeFilter}
    />*/}
  </div>
};

export default ResendingList;