import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { retrieveObject, setSearchFilter, retrieveSearchLists } from '../../../../redux/object-reducer'
import SearchDialog from './SearchDialog';

const SearchDialogContainer = ({ ...props }) => {
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
    
       return <SearchDialog open={props.open} retrieveObject={props.retrieveObject} handleClose={props.handleClose} 
        setSearchFilter={props.setSearchFilter} searchFilter={props.searchFilter}
        searchLists={props.searchLists} />
}

const mapStateToProps = (state) => ({
    searchFilter: state.obj.searchFilter,
    searchLists: state.obj.searchLists,
})

export default connect(mapStateToProps, { retrieveObject, setSearchFilter, retrieveSearchLists })(SearchDialogContainer)