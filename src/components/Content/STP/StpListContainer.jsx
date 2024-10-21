import { React, useState } from "react"
import { connect } from "react-redux"
import StpList from './StpList'
import AddStpContainer from './AddStp/AddStpContainer'
import { getStp, retrieveStp, setSearchFilter, setCurrentPage } from '../../../redux/stp-reducer'
import showAlert from '../../../redux/mainReducer'

const StpListContainer = (props) => {
    const [showCreateStpDialog, setShowCreateStpDialog] = useState(false);
    const [needRefresh, setNeedRefresh] = useState(false);
    const onCreateClick = () => {
        setShowCreateStpDialog(true)
    }
    return <>
        <StpList
            onCreateClick={onCreateClick}
            retrieveStp={props.retrieveStp}
            getStp={props.getStp}
            list={props.list}
            searchFilter={props.searchFilter}
            setSearchFilter={props.setSearchFilter}
            setCurrentPage={props.setCurrentPage}
            needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}
            showAlert={props.showAlert}
            user={props.user}
        />
        {showCreateStpDialog
            && <AddStpContainer
                open={showCreateStpDialog}
                setNeedRefresh={setNeedRefresh}
                handleClose={() => setShowCreateStpDialog(false)} />
        }
    </>
}
const mapStateToProps = (state) => ({
    list: state.stp.list,
    searchFilter: state.stp.searchFilter,
    user: state.auth.user
})
export default connect(mapStateToProps, { setCurrentPage, getStp, retrieveStp, setSearchFilter, showAlert })(StpListContainer)