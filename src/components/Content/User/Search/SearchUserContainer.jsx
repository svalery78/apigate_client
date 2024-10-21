import React from 'react';
import { connect } from 'react-redux';
import { retrieveUser, setSearchFilter } from '../../../../redux/users-reducer'
import SearchUserDialog from './SearchUserDialog';

const SearchUserContainer = ({ ...props }) => {
    return <SearchUserDialog open={props.open} data={props.data} retrieveUser={props.retrieveUser} handleClose={props.handleClose} 
        setSearchFilter={props.setSearchFilter} searchFilter={props.searchFilter} />
}

const mapStateToProps = (state) => ({
    searchFilter: state.user.searchFilter,
})

export default connect(mapStateToProps, { retrieveUser, setSearchFilter })(SearchUserContainer)