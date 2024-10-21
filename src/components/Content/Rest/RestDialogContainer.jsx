import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { saveRest, retrieveSearchLists } from '../../../redux/rest-reducer';
import RestDialog from './RestDialog';

const RestDialogContainer = ({ ...props }) => {
    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('systemList');
        }
    }, [props.open])

    return <RestDialog open={props.open} data={props.record.data} isLoading={props.record.isLoading}
        saveRest={props.saveRest} handleClose={props.handleClose} searchLists={props.searchLists} />
}

const mapStateToProps = (state) => ({
    searchLists: state.rest.searchLists,
    record: state.rest.record
})

export default connect(mapStateToProps, { saveRest, retrieveSearchLists })(RestDialogContainer)