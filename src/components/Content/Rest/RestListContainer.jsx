import { React, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RestList from './RestList';
import { getRest, retrieveRest, repeatRequest, setSearchFilter, setShowErrorsOnly, setCurrentPage } from '../../../redux/rest-reducer';
import { showAlert } from '../../../redux/mainReducer';

const RestListContainer = (props) => {
    const [needRefresh, setNeedRefresh] = useState(false);

    return <RestList getRest={props.getRest} retrieveRest={props.retrieveRest} list={props.list} 
    repeatRequest={props.repeatRequest} searchFilter={props.searchFilter} setSearchFilter={props.setSearchFilter} 
    showErrorsOnly={props.showErrorsOnly} setShowErrorsOnly={props.setShowErrorsOnly} showAlert={props.showAlert}
    setCurrentPage={props.setCurrentPage} needRefresh={needRefresh} setNeedRefresh={setNeedRefresh} />
}

const mapStateToProps = (state) => ({
    list: state.rest.list,
    searchFilter: state.rest.searchFilter,
    showErrorsOnly: state.rest.showErrorsOnly
})

export default compose(connect(mapStateToProps, { setCurrentPage, getRest, retrieveRest, repeatRequest, setSearchFilter, setShowErrorsOnly, showAlert }))(RestListContainer);