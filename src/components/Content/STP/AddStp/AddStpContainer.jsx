import React, { useEffect } from "react";
import { connect } from "react-redux";
import AddStp from "./AddStp";
import { createStp, retrieveSearchLists } from '../../../../redux/stp-reducer'
import { showAlert } from '../../../../redux/mainReducer'

const AddStpContainer = ({ ...props }) => {
    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('systemList');
        }
    }, [props.open])

    const refreshList = () => {
        props.setNeedRefresh(true);
    }

    return <AddStp showAlert={props.showAlert} searchLists={props.searchLists}
        retrieveSystem={props.retrieveSystem} open={props.open} createStp={props.createStp} onClose={props.handleClose} refreshList={refreshList}/>
}
const mapStateToProps = (state) => ({
    list: state.sys.list,
    searchLists: state.stp.searchLists
})

export default connect(mapStateToProps, { createStp, showAlert, retrieveSearchLists })(AddStpContainer)