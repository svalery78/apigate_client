
import React from "react";
import { connect } from "react-redux";
import AddSetting from "./AddSetting";
import {createSetting, retrieveSetting} from '../../../../redux/setting-reducer'

const AddSettingContainer = ({ ...props }) => {
    const refreshList = () => {
        props.setNeedRefresh(true);
    }

    return <AddSetting open={props.open} createSetting={props.createSetting} onClose={() => props.handleClose()} refreshList={refreshList}/>
}

const mapStateToProps = () => ({
})

export default connect(mapStateToProps, {createSetting, retrieveSetting})(AddSettingContainer) 