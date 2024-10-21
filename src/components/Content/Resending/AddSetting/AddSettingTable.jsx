import React from 'react';
import Table from '../../../UIElements/Table/EditableTable/Table';
import Input from '../../../UIElements/Input';
import s from './AddSettingTable.module.css';
import DeleteIcon from '@material-ui/icons/Close';
import IconWithText from '../../../UIElements/IconWithText/IconWithText';

const AddSettingTable = ({ /*setCursorPosition, customFocus,*/ data, focusOnField, optionsOrganization, setFieldForAddSetting, setFocusOnField, 
  setFieldValue, getAsyncOption, deleteSettingsLine, copyCellForAddInData, name, ...props }) => {
  
  //Удалить текущую строку
  const onRemove = (index) => {
    deleteSettingsLine(index);
  }
  
  const columns = [
    {
      Header: <><span>Номер</span></>,
      id: 'number',
      Cell: ({ row: { index } }) => (<Input name={ `data[${index}].number`} value={index + 1} readonly={true}/>)
    },
    {
      Header: <><span>Количество попыток</span>&#160;<span className={s.redStar}>*</span></>,
      id: 'count',
      accessor: 'count',
      type: 'number',
      Cell: ({ row: { index } }) => (<Input name={ `data[${index}].count` }/>)
    },
    {
      Header: <><span>Интервал (мин)</span>&#160;<span className={s.redStar}>*</span></>,
      id: 'interval',
      accessor: 'interval',
      type: 'number',
      Cell: ({ row: { index } }) => (<Input name={ `data[${index}].interval`}/>)
    },
    {
      Header: '',
      id: 'actions',
      Cell: ({ row: { index } }) => (<div className={s.twoActions}>
        {/* {data.length - 1 !== index
          ? <> */}
              <IconWithText onClick={() => onRemove(index)}><DeleteIcon className={s.redBtn} title='Удалить текущую строку'/></IconWithText>
            {/* </>
          : <>
              <IconWithText><DeleteIcon className={s.grayBtn} title='Удалить текущую строку'/></IconWithText>
            </>
        } */}
      </div>)
    }
  ]

  return (
    <div className={s.addSettingTableWhithTwoAction}>
      <Table className={s.table} data={data} columns={columns} rowKey='_id' setFieldForInput={setFieldForAddSetting} />
    </div>
  )
}
export default AddSettingTable;


