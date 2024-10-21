import React from "react";
import { connect } from "react-redux";
import SettingDialog from "./SettingDialog";
import { saveSetting } from '../../../redux/setting-reducer'


const SettingDialogContainer = ({ ...props }) => {
    const refreshList = () => {
        props.setNeedRefresh(true);
    }
    return <SettingDialog
        onClose={props.handleClose}
        open={props.open}
        data={props.record.data} isLoading={props.record.isLoading}
        saveSetting={props.saveSetting}
        refreshList={refreshList} />
}
const mapStateToProps = (state) => ({
    record: state.setting.record
})

export default connect(mapStateToProps, { saveSetting })(SettingDialogContainer)