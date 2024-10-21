import { stpAPI } from "../api/stp";
import { systemAPI } from "../api/system";
import { getRequestParams, clearObjEmptyStrings } from '../utils/custom';
import { showAlert } from "./mainReducer";

let initialState = {
    record: {
        data: {
            ID: "",
            Name: "",
            SystemID: "",
            SystemName: "",
            blocking: false,
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
    searchLists: {
        systemList: { data: [], isLoading: false }
    }
}

export const stpReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'APIGATE/STP/SET_STP_RECORD':
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
            case 'APIGATE/STP/SET_RECORD_IS_LOADING':
            return {
                ...state,
                record: {
                    ...state.record,
                    isLoading: action.value
                }
            }
        case 'APIGATE/STP/SET_STP_LIST':
            return {
                ...state,
                list: {
                    ...state.list,
                    data: action.data,
                    count: action.count
                }
            }
        case 'APIGATE/STP/SET_STP_LIST_IS_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    isLoading: action.value
                }
            }
        case 'APIGATE/STP/SET_SEARCH_FILTER':
            const searchFilter = clearObjEmptyStrings(action.data);
            return {
                ...state,
                searchFilter: searchFilter,
                list: {...state.list, page: 1}
            }
        case 'APIGATE/STP/SET_SEARCH_LIST':
            return {
                ...state,
                searchLists: {
                    ...state.searchLists,
                    [action.name]: action.value
                }
            }
        case 'APIGATE/STP/SET_SEARCH_LIST_IS_LOADING':
            return {
                ...state,
                searchLists: {
                    ...state.searchLists,
                    [action.name]: {
                        ...state.searchLists[action.name],
                        isLoading: action.value
                    }
                }
            }
        case 'APIGATE/STP/SET_PAGE':
            return {
                ...state,
                list: { ...state.list, page: action.page }
            }
        default:
            return state;
    }
}
export const setCurrentPage = (page) => ({ type: 'APIGATE/STP/SET_PAGE', page })
const setStpRecord = (value) => ({ type: 'APIGATE/STP/SET_STP_RECORD', value: value })
const setRecordIsLoading = (value) => ({ type: 'APIGATE/STP/SET_RECORD_IS_LOADING', value: value })
const setStpList = (data, count) => ({ type: 'APIGATE/STP/SET_STP_LIST', data, count })
const setStpListIsLoading = (value) => ({ type: 'APIGATE/STP/SET_STP_LIST_IS_LOADING', value })
export const setSearchFilter = (data) => ({ type: 'APIGATE/STP/SET_SEARCH_FILTER', data })
const setSearchList = (name, value) => ({ type: 'APIGATE/STP/SET_SEARCH_LIST', name, value });
const setSearchListIsLoading = (name, value) => ({ type: 'APIGATE/STP/SET_SEARCH_LIST_IS_LOADING', name, value })

export const getStp = (id) => async (dispatch) => {
    try {
        dispatch(setRecordIsLoading(true));
        let record = await stpAPI.getStp(id)
        if (record) {
            dispatch(setStpRecord(record))
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка получения СТП. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const saveStp = (data, id, refreshList) => async (dispatch) => {
    try {
        const response = await stpAPI.saveStp(data, id)
        if (response.id) {
            dispatch(showAlert({ text: 'СТП обновлено', severity: 'success', title: 'Обновление' }));
            refreshList()
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка обновленя СТП. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const createStp = (data, id, refreshList) => async (dispatch) => {
    try {
        const response = await stpAPI.createStp(data, id)
        if (response && response.status === 'SUCCESS') {
            dispatch(showAlert({ text: 'СТП создано', severity: 'success', title: 'Создание' }));
            refreshList();
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка создания СТП. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const retrieveStp = (searchParams, page, pageSize) => (dispatch) => {
    dispatch(setStpListIsLoading(true))
    const params = getRequestParams(searchParams, page, pageSize);
    stpAPI.getStpList(params)
        .then((response) => {
            const totalPages = response.totalPages
            const data = response.data
            const totalItems = response.totalItems
            dispatch(setStpList(data, totalPages))
            dispatch(setStpListIsLoading(false))
            if(totalItems === 0){
                dispatch(showAlert({ text: `Записи не найдены`, severity: 'info', title: 'Поиск' }));
            }
        })
        .catch((e) => {
            dispatch(setStpListIsLoading(false))
            dispatch(showAlert({ text: `Ошибка получения списка. ${e}`, severity: 'error', title: 'Ошибка' }));
        })
};

export const retrieveSearchLists = (listName) => (dispatch) => {
    switch (listName) {
        case 'systemList':
            dispatch(setSearchListIsLoading(listName, true));
            systemAPI.getSystemList()
                .then((response) => {
                    const data = response.data;
                    const list = data.map((system) => {
                        return { value: system._id, label: system.name }
                    })
                    dispatch(setSearchList(listName, { data: list, isLoading: false }));
                })
                .catch((e) => {
                    dispatch(showAlert({ text: `Ошибка получения списка. ${e}`, severity: 'error', title: 'Ошибка' }));
                })
            break;
        default: 
    }
};