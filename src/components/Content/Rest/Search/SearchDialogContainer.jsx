import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { retrieveRest, setSearchFilter, retrieveSearchLists } from '../../../../redux/rest-reducer'
import SearchDialog from './SearchDialog';

const SearchDialogContainer = ({ ...props }) => {
    useEffect(() => {
        if (props.open) {
            props.retrieveSearchLists('systemList');
        }
    }, [props.open])

    return <SearchDialog open={props.open} data={props.data} retrieveRest={props.retrieveRest} handleClose={props.handleClose} setPage={props.setPage}
        setSearchFilter={props.setSearchFilter} searchFilter={props.searchFilter} showErrorsOnly={props.showErrorsOnly}
        searchLists={props.searchLists}/>
}

const mapStateToProps = (state) => ({
    searchFilter: state.rest.searchFilter,
    showErrorsOnly: state.rest.showErrorsOnly,
    searchLists: state.rest.searchLists
})

export default connect(mapStateToProps, { retrieveRest, setSearchFilter, retrieveSearchLists })(SearchDialogContainer)