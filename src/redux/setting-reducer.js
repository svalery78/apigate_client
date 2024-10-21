import { settingAPI } from "../api/setting";
import { getRequestParams, clearObjEmptyStrings } from '../utils/custom';
import { showAlert } from "./mainReducer";

let initialState = {
    record: {
        data: {
            id: '',
            name: '',
            value: '',
        },
        isLoading: false
    },
    list: {
        data: [],
        count: 0,
        page: 1,
        isLoading: false
    },
    searchFilter: {},
}

export const settingReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'APIGATE/SETTING/SET_SETTING_RECORD':
            return {
                ...state,
                record: {
                    data: {
                        ...initialState.record.data,
                        ...action.value,
                    },
                    isLoading: false
                }
            }
        case 'APIGATE/SETTING/SET_RECORD_IS_LOADING':
            return {
                ...state,
                record: {
                    ...state.record,
                    isLoading: action.value
                }
            }
        case 'APIGATE/SETTING/SET_SETTING_LIST':
            return {
                ...state,
                list: {
                    ...state.list,
                    data: action.data,
                    count: action.count
                }
            }
        case 'APIGATE/SETTING/SET_SETTING_LIST_IS_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    isLoading: action.value
                }
            }
        case 'APIGATE/SETTING/SET_SEARCH_FILTER':
            const searchFilter = clearObjEmptyStrings(action.data);
            return {
                ...state,
                searchFilter: searchFilter,
                list: { ...state.list, page: 1 }
            }
        case 'APIGATE/SETTING/SET_PAGE':
            return {
                ...state,
                list: { ...state.list, page: action.page }
            }
        default:
            return state;
    }
}
export const setCurrentPage = (page) => ({ type: 'APIGATE/SETTING/SET_PAGE', page })
const setSettingRecord = (value) => ({ type: 'APIGATE/SETTING/SET_SETTING_RECORD', value: value })
const setRecordIsLoading = (value) => ({ type: 'APIGATE/SETTING/SET_RECORD_IS_LOADING', value: value })
const setSettingList = (data, count) => ({ type: 'APIGATE/SETTING/SET_SETTING_LIST', data, count })
const setSettingListIsLoading = (value) => ({ type: 'APIGATE/SETTING/SET_SETTING_LIST_IS_LOADING', value })
export const setSearchFilter = (data) => ({ type: 'APIGATE/SETTING/SET_SEARCH_FILTER', data })

export const getSetting = (id) => async (dispatch) => {
    try {
        dispatch(setRecordIsLoading(true));
        let record = await settingAPI.getSetting(id)
        if (record) {
            dispatch(setSettingRecord(record))
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка получения настроек. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const saveSetting = (data, id, refreshList) => async (dispatch) => {
    try {
        const record = await settingAPI.saveSetting(data, id)
        if (record.id) {
            dispatch(showAlert({ text: 'Настройка обновлена', severity: 'success', title: 'Обновление' }));
            refreshList();
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка обновления настройки. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const createSetting = (data, id, refreshList) => async (dispatch) => {
    try {
        const record = await settingAPI.createSetting(data, id)
        if (record.id) {
            dispatch(showAlert({ text: 'Настройка добавлена', severity: 'success', title: 'Создание' }));
            refreshList();
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка добавления настройки. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const retrieveSetting = (searchParams, page, pageSize) => (dispatch) => {
    dispatch(setSettingListIsLoading(true))
    const params = getRequestParams(searchParams, page, pageSize);
    settingAPI.getSettingList(params)
        .then((response) => {
            const totalPages = response.totalPages
            const data = response.data
            const totalItems = response.totalItems
            dispatch(setSettingList(data, totalPages))
            dispatch(setSettingListIsLoading(false))
            if (totalItems === 0) {
                dispatch(showAlert({ text: `Записи не найдены`, severity: 'info', title: 'Поиск' }));
            }
        })
        .catch((e) => {
            dispatch(setSettingListIsLoading(false))
            dispatch(showAlert({ text: `Ошибка получения списка. ${e}`, severity: 'error', title: 'Ошибка' }));
        })
};
