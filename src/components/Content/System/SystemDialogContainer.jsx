
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { saveSystem, retrieveSearchLists } from '../../../redux/system-reducer'
import SystemDialog from "./SystemDialog";

const SystemDialogContainer = ({ ...props }) => {

    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('systemList');
            props.retrieveSearchLists('userList');
        }
    }, [props.open])

    const refreshList = () => {
        props.setNeedRefresh(true);
    }

    return <SystemDialog
        onClose={() => props.handleClose()}
        open={props.open} data={props.data}
        saveSystem={props.saveSystem}
        searchLists={props.searchLists}
        refreshList={refreshList}
        data={props.record.data} isLoading={props.record.isLoading}
         />
}
const mapStateToProps = (state) => ({
    searchLists: state.sys.searchLists,
    record: state.sys.record
})

export default connect(mapStateToProps, { saveSystem, retrieveSearchLists })(SystemDialogContainer)