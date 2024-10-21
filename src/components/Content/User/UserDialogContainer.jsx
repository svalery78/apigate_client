import { React } from "react"
import { connect } from "react-redux"
import UserDialog from './UserDialog'
import { saveUser } from '../../../redux/users-reducer'

const UserDialogContainer = ({ ...props }) => {
    const refreshList = () => {
        props.setNeedRefresh(true);
    }
    return <UserDialog
        open={props.open}
        data={props.record.data} isLoading={props.record.isLoading}
        saveUser={props.saveUser}
        handleClose={props.handleClose}
        refreshList={refreshList} />
}

const mapStateToProps = (state) => ({
    record: state.user.record
})

export default connect(mapStateToProps, { saveUser })(UserDialogContainer)