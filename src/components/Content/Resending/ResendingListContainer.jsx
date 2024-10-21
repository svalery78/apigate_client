import { React, useState } from "react"
import { connect } from "react-redux"
import ResendingList from './ResendingList'
//import AddResendingContainer from './AddResending/AddResendingContainer'
import { getResending, retrieveResending, setSearchFilter, setCurrentPage } from '../../../redux/resending-reducer'
import showAlert from '../../../redux/mainReducer'

const ResendingListContainer = (props) => {
    //const [showCreateResendingDialog, setShowCreateResendingDialog] = useState(false);
    const [needRefresh, setNeedRefresh] = useState(false);
    /*const onCreateClick = () => {
        setShowCreateResendingDialog(true)
    }*/
    return <>
        <ResendingList
            //onCreateClick={onCreateClick}
            retrieveResending={props.retrieveResending}
            getResending={props.getResending}
            list={props.list}
            //searchFilter={props.searchFilter}
            //setSearchFilter={props.setSearchFilter}
            setCurrentPage={props.setCurrentPage}
            needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}
            showAlert={props.showAlert}
            user={props.user}
        />
        {/*showCreateResendingDialog
            && <AddResendingContainer
                open={showCreateResendingDialog}
                setNeedRefresh={setNeedRefresh}
                handleClose={() => setShowCreateResendingDialog(false)} />
        */}
    </>
}
const mapStateToProps = (state) => ({
    list: state.resending.list,
    //searchFilter: state.resending.searchFilter,
    user: state.auth.user
})
export default connect(mapStateToProps, { setCurrentPage, getResending, retrieveResending, setSearchFilter, showAlert })(ResendingListContainer)