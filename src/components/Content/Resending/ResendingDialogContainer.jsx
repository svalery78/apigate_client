import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ResendingDialog from './ResendingDialog';
import { saveResending, retrieveSearchLists, addSettingsLine, deleteSettingsLine, setFieldForAddSetting } from '../../../redux/resending-reducer';

import { showAlert } from '../../../redux/mainReducer'
const ResendingDialogContainer = ({ ...props }) => {
    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('systemList');
        }
    }, [props.open])
    const refreshList = () => {
        props.setNeedRefresh(true);
    }
    const [focusOnField, setFocusOnField] = useState('');
    return <ResendingDialog
        onClose={props.handleClose}
        open={props.open}
        searchLists={props.searchLists}
        data={props.record.data} 
        isLoading={props.record.isLoading}
        saveResending={props.saveResending}
        retrieveSystem={props.retrieveSystem}
        showAlert={props.showAlert}
        refreshList={refreshList} 
        focusOnField={focusOnField}
        setFocusOnField={setFocusOnField}
        deleteSettingsLine={props.deleteSettingsLine}
        addSettingsLine={props.addSettingsLine}
        setFieldForAddSetting={props.setFieldForAddSetting}
        />
}
const mapStateToProps = (state) => ({
    list: state.sys.list,
    record: state.resending.record,
    searchLists: state.resending.searchLists
})

export default connect(mapStateToProps, { saveResending, showAlert, retrieveSearchLists, addSettingsLine, deleteSettingsLine, setFieldForAddSetting })(ResendingDialogContainer)