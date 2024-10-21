import React, { useEffect } from "react";
import { connect } from "react-redux";
import ObjectDialog from './ObjectDialog'
import { saveObject, retrieveSearchLists } from '../../../redux/object-reducer';
import { setSearchFilter } from '../../../redux/rest-reducer'

const OpenObjectContainer = ({ ...props }) => {
    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('systemList');
        }
    }, [props.open])
    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('stpList');
        }
    }, [props.open])

    const refreshList = () => {
        props.setNeedRefresh(true);
    }

    return <ObjectDialog
        onClose={() => props.handleClose()}
        open={props.open}
        data={props.record.data} isLoading={props.record.isLoading}
        saveObject={props.saveObject}
        searchLists={props.searchLists}
        refreshList={refreshList}
        setSearchFilter={props.setSearchFilter}
    />
}
const mapStateToProps = (state) => ({
    searchLists: state.obj.searchLists,
    record: state.obj.record
})

export default connect(mapStateToProps, { saveObject, retrieveSearchLists, setSearchFilter })(OpenObjectContainer)