
import React, { useEffect } from "react";
import { connect } from "react-redux";
import s from '../../../Dialogs/RecordDialog.module.css'
import AddSystem from "./AddSystem";
import { createSystem, retrieveSearchLists } from '../../../../redux/system-reducer'


const AddSystemContainer = ({ ...props }) => {

    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('userList');
        }
    }, [props.open])

    const refreshList = () => {
        props.setNeedRefresh(true);
    }

    return <AddSystem
        open={props.open}
        createSystem={props.createSystem} searchLists={props.searchLists} refreshList={refreshList}
        onClose={() => props.handleClose()} />
}

const mapStateToProps = (state) => ({
    searchLists: state.sys.searchLists
})

export default connect(mapStateToProps, { createSystem, retrieveSearchLists })(AddSystemContainer)