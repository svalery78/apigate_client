import { React, useState } from "react"
import { connect } from "react-redux"
import SettingList from './SettingList'
import AddSettingContainer from './AddSetting/AddSettingContainer'
import { getSetting, retrieveSetting, setSearchFilter, setCurrentPage } from '../../../redux/setting-reducer'

const SettingListContainer = ({...props}) => {
    const [showCreateSettingDialog, setShowCreateSettingDialog] = useState(false);
    const [needRefresh, setNeedRefresh] = useState(false);
    const onCreateClick = () => {
        setShowCreateSettingDialog(true)
    }
    
    return <>
        <SettingList
            onCreateClick={onCreateClick}
            retrieveSetting={props.retrieveSetting}
            getSetting={props.getSetting}
            list={props.list}
            searchFilter={props.searchFilter} setSearchFilter={props.setSearchFilter}
            setCurrentPage={props.setCurrentPage}
            needRefresh={needRefresh} setNeedRefresh={setNeedRefresh}/>
        {showCreateSettingDialog
            && <AddSettingContainer
                open={showCreateSettingDialog}
                setNeedRefresh={setNeedRefresh}
                handleClose={() => setShowCreateSettingDialog(false)} />
        }
    </>
}

const mapStateToProps = (state) => ({
    list: state.setting.list,
    searchFilter: state.setting.searchFilter,
})
export default connect(mapStateToProps, { setCurrentPage, getSetting, retrieveSetting, setSearchFilter })(SettingListContainer)