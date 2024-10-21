import { React, useState } from "react"
import { connect } from "react-redux"
import SystemList from './SystemList'
import { getSystem, retrieveSystem, setSearchFilter, setCurrentPage } from '../../../redux/system-reducer'
import AddSystemContainer from "./AddSystem/AddSystemContainer"

const SystemListContainer = (props) => {
    const [showCreateSystemDialog, setShowCreateSystemDialog] = useState(false);
    const [needRefresh, setNeedRefresh] = useState(false);
    const onCreateClick = () => {
        setShowCreateSystemDialog(true)
    }
    return <>
        <SystemList
            onCreateClick={onCreateClick}
            retrieveSystem={props.retrieveSystem}
            getSystem={props.getSystem}
            list={props.list}
            searchFilter={props.searchFilter} setSearchFilter={props.setSearchFilter}
            setCurrentPage={props.setCurrentPage}
            UserId={props.UserId} needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}/>
        {showCreateSystemDialog
            && <AddSystemContainer
                    open={showCreateSystemDialog}
                    setNeedRefresh={setNeedRefresh}
                    handleClose={() => setShowCreateSystemDialog(false)} />
        }
    </>
}
const mapStateToProps = (state) => ({
    list: state.sys.list,
    searchFilter: state.sys.searchFilter,
    UserId: state.user.list
})

export default connect(mapStateToProps, { setCurrentPage, getSystem, retrieveSystem, setSearchFilter })(SystemListContainer)