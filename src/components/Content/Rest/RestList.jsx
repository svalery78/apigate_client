import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useTable, useRowSelect } from 'react-table';
import s from './RestList.module.css';
import Status from '../../UIElements/Status/Status';
import RestDialogContainer from './RestDialogContainer';
import SearchDialogContainer from './Search/SearchDialogContainer';
import { FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';
import { isEmpty, getLocalizedDate } from '../../../utils/custom';
import { getSearchParams } from '../../../utils/search';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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

const RestList = (props) => {
  const [showOpenDialog, setShowOpenDialog] = useState(false);
  const [showOpenSearch, setShowOpenSearch] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const searchParams = getSearchParams('rest', props.searchFilter);
    props.retrieveRest(searchParams, props.list.page, pageSize);
  }, [props.searchFilter, props.list.page, pageSize])

  useEffect(() => {
    if (props.needRefresh) {
      const searchParams = getSearchParams('rest', props.searchFilter);
      props.retrieveRest(searchParams, props.list.page, pageSize);
      props.setNeedRefresh(false);
    }
  }, [props.needRefresh])

  const handlePageChange = (event, value) => {
    props.setCurrentPage(value);
  };

  const onRowClick = (id) => {
    props.getRest(id);
    setShowOpenDialog(true);
  };

  const columns = useMemo(
    () => [
      { Header: 'Статус', accessor: 'status', Cell: props => <Status state={props.row.original.status} /> },
      { Header: 'Объект.ID', accessor: 'objectID' },
      { Header: 'Тип', accessor: 'type' },
      { Header: 'Таблица', accessor: 'tableName' },
      { Header: 'Система', accessor: 'systemName' },
      {
        Header: 'Дата', accessor: d => {
          return getLocalizedDate(d.data).replace(' ', ' \u00A0');
        }
      },
      { Header: 'Запрос', accessor: 'request', Cell: props => <div title={props.row.original.request}>{props.row.original.request}</div> },
      { Header: 'Ответ', accessor: 'result', Cell: props => <div title={props.row.original.result}>{props.row.original.result}</div> },
    ], []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleAllRowsSelected
  } = useTable(
    {
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
              {row.depth === 0 && row.original.type !== 'Входящий' /*&& row.original.status === 'ERROR'*/ ? <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} /> : null}
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

  const onSendClick = () => {
    const selectefRows = [];
    selectedFlatRows.forEach((selectedRow) => {
      selectefRows.push(selectedRow.original._id);
      props.repeatRequest(selectedRow.original._id);

    });

    props.showAlert({
      text: `Запущена повторная отправка\n${selectefRows.join('\n')}`, severity: 'success', title: `Запущена повторная отправка`
    });

    toggleAllRowsSelected(false);
  };

  const onShowErrorChange = (e) => {
    if (e.currentTarget.checked) {
      props.setShowErrorsOnly(true);
      props.setSearchFilter({
        ...props.searchFilter,
        type: 'Исходящий',
        status: 'ERROR'
      })
    } else {
      props.setShowErrorsOnly(false);
      props.setSearchFilter({});
    }
  };

  const removeFilter = () => {
    props.setSearchFilter({});
    props.setShowErrorsOnly(false);
  };
  const refreshList = () => {
    props.setNeedRefresh(true);
  };

  return <div className={s.container}>
    <OverlaySpinner active={props.list.isLoading}>
      <div className='list row w-100'><h5>REST запросы</h5>
        <div className={s.buttonsGrid}>
          <button
            className='btn btn-outline-secondary'
            type='button'
            onClick={() => setShowOpenSearch(true)}
          >
            Поиск
          </button>
          <FormGroup className={s.showErrors}>
            <FormControlLabel control={<Checkbox onChange={onShowErrorChange} checked={props.showErrorsOnly} />} label='Показать ошибки' />
          </FormGroup>
          <button
            className='btn btn-outline-secondary'
            type='button'
            disabled={selectedFlatRows.length === 0 ? "disabled" : null} //если чекбокс пустой, кнопка неактивна
            onClick={onSendClick}>
            Ручная отправка
          </button>
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

          <table className={(props.list.data.length === 0) ? ' table table-striped table-bordered  ' + s.mainTable : ' table table-striped table-bordered  '} //скукоживалась таблица, если поиск не дал результатов
           {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} height="40px">
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} height="40px">
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
                          <div className={cn({[s.tableCell]: true, [s.dataCell]: cell.column.id !== 'selection'})} >
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
        {/* */}
      </div>
    </OverlaySpinner>
    {showOpenDialog && <RestDialogContainer
      open={showOpenDialog}
      handleClose={() => setShowOpenDialog(false)}
    />}
    {showOpenSearch && <SearchDialogContainer
      open={showOpenSearch}
      handleClose={() => setShowOpenSearch(false)}
    />}
  </div>
};

export default RestList;
