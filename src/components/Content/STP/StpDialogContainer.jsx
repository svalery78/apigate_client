import React, { useEffect } from "react";
import { connect } from "react-redux";
import StpDialog from "./StpDialog";
import { saveStp, retrieveSearchLists } from '../../../redux/stp-reducer'
import { showAlert } from '../../../redux/mainReducer'
const StpDialogContainer = ({ ...props }) => {
    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('systemList');
        }
    }, [props.open])
    const refreshList = () => {
        props.setNeedRefresh(true);
    }
    return <StpDialog
        onClose={props.handleClose}
        open={props.open}
        searchLists={props.searchLists}
        data={props.record.data} isLoading={props.record.isLoading}
        saveStp={props.saveStp}
        retrieveSystem={props.retrieveSystem}
        showAlert={props.showAlert}
        refreshList={refreshList} />
}
const mapStateToProps = (state) => ({
    list: state.sys.list,
    record: state.stp.record,
    searchLists: state.stp.searchLists
})

export default connect(mapStateToProps, { saveStp, showAlert, retrieveSearchLists })(StpDialogContainer)