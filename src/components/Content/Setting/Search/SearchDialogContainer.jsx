import React from 'react';
import { connect } from 'react-redux';
import { retrieveSetting, setSearchFilter } from '../../../../redux/setting-reducer'
import SearchDialog from './SearchDialog';

const SearchDialogContainer = ({ ...props }) => {
    return <SearchDialog open={props.open} data={props.data} retrieveSetting={props.retrieveSetting} handleClose={props.handleClose} 
        setSearchFilter={props.setSearchFilter} searchFilter={props.searchFilter} />
}

const mapStateToProps = (state) => ({
    searchFilter: state.setting.searchFilter,
})

export default connect(mapStateToProps, { retrieveSetting, setSearchFilter })(SearchDialogContainer)