import { React, useState } from "react"
import { connect } from "react-redux"
import ObjectList from './ObjectList'
import { getObject, retrieveObject, setSearchFilter, setCurrentPage } from '../../../redux/object-reducer'
import { compose } from "redux"

const ObjectListContainer = (props) => {
    const [needRefresh, setNeedRefresh] = useState(false);
    
    return <ObjectList
        retrieveObject={props.retrieveObject}
        getObject={props.getObject}
        list={props.list}
        searchFilter={props.searchFilter}
        setSearchFilter={props.setSearchFilter}
        needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}
        setCurrentPage={props.setCurrentPage}
    />
}

const mapStateToProps = (state) => ({
    list: state.obj.list,
    searchFilter: state.obj.searchFilter,
})
export default compose(connect(mapStateToProps, { setCurrentPage, getObject, retrieveObject, setSearchFilter }))(ObjectListContainer)