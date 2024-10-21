import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { retrieveStp, setSearchFilter, retrieveSearchLists } from '../../../../redux/stp-reducer'
import showAlert from '../../../../redux/mainReducer'
import SearchDialog from './SearchDialog';

const SearchDialogContainer = ({ ...props }) => {
    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('systemList');
        }
    }, [props.open])
    return <SearchDialog open={props.open} data={props.data} retrieveStp={props.retrieveStp} handleClose={props.handleClose} 
        setSearchFilter={props.setSearchFilter} searchFilter={props.searchFilter} searchLists={props.searchLists} showAlert={props.showAlert} />
}
const mapStateToProps = (state) => ({
    searchFilter: state.stp.searchFilter,
    searchLists: state.stp.searchLists
})

export default connect(mapStateToProps, { retrieveStp, setSearchFilter, retrieveSearchLists, showAlert })(SearchDialogContainer)