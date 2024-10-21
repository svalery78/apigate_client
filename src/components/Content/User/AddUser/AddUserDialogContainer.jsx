import React from "react";
import { connect } from "react-redux";
import AddUserDialog from "./AddUserDialog";
import {signupUser} from '../../../../redux/users-reducer'


const AddUserDialogContainer = ({ ...props }) => {
    const refreshList = () => {
        props.setNeedRefresh(true);
    }

    return <AddUserDialog open={props.open} signupUser={props.signupUser} record={props.record} handleClose={props.handleClose} refreshList={refreshList}/>
}
const mapStateToProps = (state) => ({
    record: state.user.record
})

export default connect(mapStateToProps, {signupUser})(AddUserDialogContainer) 