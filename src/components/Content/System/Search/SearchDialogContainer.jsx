import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { retrieveSystem, setSearchFilter, retrieveSearchLists} from '../../../../redux/system-reducer'
import SearchDialog from './SearchDialog';

const SearchDialogContainer = ({ ...props }) => {
    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('systemList');
            props.retrieveSearchLists('userList');
        }
    }, [props.open])

    return <SearchDialog open={props.open} retrieveObject={props.retrieveObject} handleClose={props.handleClose} 
        setSearchFilter={props.setSearchFilter} searchFilter={props.searchFilter}
        searchLists={props.searchLists} />
}

const mapStateToProps = (state) => ({
    searchFilter: state.sys.searchFilter,
    searchLists: state.sys.searchLists
})

export default connect(mapStateToProps, { retrieveSystem, setSearchFilter, retrieveSearchLists })(SearchDialogContainer)