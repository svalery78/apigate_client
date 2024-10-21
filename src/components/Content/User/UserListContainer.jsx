import { React, useState } from "react"
import { connect } from "react-redux"
import UserList from './UserList'
import { getUser, retrieveUser, setSearchFilter, setCurrentPage } from '../../../redux/users-reducer'
import AddUserDialogContainer from './AddUser/AddUserDialogContainer'

const UserContainer = props => {
    const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
    const [needRefresh, setNeedRefresh] = useState(false);
    const onCreateClick = () => {
        setShowCreateUserDialog(true)
    }
    return (
        <>
            <UserList
                onCreateClick={onCreateClick}
                getUser={props.getUser}
                retrieveUser={props.retrieveUser}
                list={props.list}
                searchFilter={props.searchFilter} setSearchFilter={props.setSearchFilter}
                setCurrentPage={props.setCurrentPage}
                needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}/>
            {showCreateUserDialog
                && <AddUserDialogContainer
                    setNeedRefresh={setNeedRefresh}
                    open={showCreateUserDialog}
                    handleClose={() => setShowCreateUserDialog(false)} />
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    list: state.user.list,
    searchFilter: state.user.searchFilter,
})
export default connect(mapStateToProps, { setCurrentPage, getUser, retrieveUser, setSearchFilter })(UserContainer)