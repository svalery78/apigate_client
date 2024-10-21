import { resendingAPI } from "../api/resending";
import { systemAPI } from "../api/system";
import { getRequestParams, clearObjEmptyStrings } from '../utils/custom';
import { showAlert } from "./mainReducer";

let initialState = {
    record: {
        data: {
            id: '',
            systemId: '',
            systemName: '',
            countTotal: 0,
            settings: []
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

export const resendingReducer = (state = initialState, action) => {
    let newCountTotal = 0;

    switch (action.type) {
        case 'APIGATE/RESENDING/SET_RESENDING_RECORD':
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
        case 'APIGATE/RESENDING/ADD_SETTING/SET_FIELD':
            let tempArrForSetField = [...state.record.data.settings].map((obj, index) => {
                if (index === Number(action.index)) {
                    obj = { ...obj, [action.name]: Number(action.value) }
                } else {
                    obj = { ...obj }
                }
                newCountTotal = newCountTotal + obj.count;
                return obj
            })

            return {
                ...state,
                record: {
                    ...state.record,
                    data: {
                        ...state.record.data,
                        settings: tempArrForSetField,
                        countTotal: newCountTotal
                    },
                }
            };
        case 'APIGATE/RESENDING/ADD_SETTING/DELETE_SETTING_LINE':
            let tempArrForDeleteLine = [...state.record.data.settings].filter((obj, index) => {
                return index !== Number(action.index);
            })

            tempArrForDeleteLine.forEach((obj) => {
                newCountTotal = newCountTotal + obj.count;
            })

            return {
                ...state,
                record: {
                    ...state.record,
                    data: {
                        ...state.record.data,
                        settings: tempArrForDeleteLine,
                        countTotal: newCountTotal
                    },
                }
            };
        case 'APIGATE/RESENDING/ADD_SETTING/ADD_SETTING_LINE':
            let tempArrForAddLine = [...state.record.data.settings];
            tempArrForAddLine.push({ count: 0, interval: 0 });

            return {
                ...state,
                record: {
                    ...state.record,
                    data: {
                        ...state.record.data,
                        settings: tempArrForAddLine
                    },
                }
            };
        case 'APIGATE/RESENDING/SET_RECORD_IS_LOADING':
            return {
                ...state,
                record: {
                    ...state.record,
                    isLoading: action.value
                }
            }
        case 'APIGATE/RESENDING/SET_RESENDING_LIST':
            return {
                ...state,
                list: {
                    ...state.list,
                    data: action.data,
                    count: action.count
                }
            }
        case 'APIGATE/RESENDING/SET_RESENDING_LIST_IS_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    isLoading: action.value
                }
            }
        case 'APIGATE/RESENDING/SET_SEARCH_FILTER':
            const searchFilter = clearObjEmptyStrings(action.data);
            return {
                ...state,
                searchFilter: searchFilter,
                list: { ...state.list, page: 1 }
            }
        case 'APIGATE/RESENDING/SET_SEARCH_LIST':
            return {
                ...state,
                searchLists: {
                    ...state.searchLists,
                    [action.name]: action.value
                }
            }
        case 'APIGATE/RESENDING/SET_SEARCH_LIST_IS_LOADING':
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
        case 'APIGATE/RESENDING/SET_PAGE':
            return {
                ...state,
                list: { ...state.list, page: action.page }
            }
        default:
            return state;
    }
}
export const setCurrentPage = (page) => ({ type: 'APIGATE/RESENDING/SET_PAGE', page })
const setResendingRecord = (value) => ({ type: 'APIGATE/RESENDING/SET_RESENDING_RECORD', value: value })
const setRecordIsLoading = (value) => ({ type: 'APIGATE/RESENDING/SET_RECORD_IS_LOADING', value: value })
const setResendingList = (data, count) => ({ type: 'APIGATE/RESENDING/SET_RESENDING_LIST', data, count })
const setResendingListIsLoading = (value) => ({ type: 'APIGATE/RESENDING/SET_RESENDING_LIST_IS_LOADING', value })
export const setSearchFilter = (data) => ({ type: 'APIGATE/RESENDING/SET_SEARCH_FILTER', data })
const setSearchList = (name, value) => ({ type: 'APIGATE/RESENDING/SET_SEARCH_LIST', name, value });
const setSearchListIsLoading = (name, value) => ({ type: 'APIGATE/RESENDING/SET_SEARCH_LIST_IS_LOADING', name, value })
export const deleteSettingsLine = (index) => ({ type: 'APIGATE/RESENDING/ADD_SETTING/DELETE_SETTING_LINE', index });
export const addSettingsLine = () => ({ type: 'APIGATE/RESENDING/ADD_SETTING/ADD_SETTING_LINE' });
export const setFieldForAddSetting = (name, value, index) => ({ type: 'APIGATE/RESENDING/ADD_SETTING/SET_FIELD', name, value, index });

export const getResending = (id) => async (dispatch) => {
    try {
        dispatch(setRecordIsLoading(true));
        let record = await resendingAPI.getResending(id)
        if (record) {
            dispatch(setResendingRecord(record))
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка получения повторной отправки. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const saveResending = (data, id, refreshList) => async (dispatch) => {
    try {
        const response = await resendingAPI.saveResending(data, id)
        if (response.id) {
            dispatch(showAlert({ text: 'Повторной отправка обновлена', severity: 'success', title: 'Обновление' }));
            refreshList()
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка обновления повторной отправки. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const createResending = (data, id, refreshList) => async (dispatch) => {
    try {
        const response = await resendingAPI.createResending(data, id)
        if (response && response.status === 'SUCCESS') {
            dispatch(showAlert({ text: 'Повторной отправка создана', severity: 'success', title: 'Создание' }));
            refreshList();
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка создания повторной отправки. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const retrieveResending = (searchParams, page, pageSize) => (dispatch) => {
    dispatch(setResendingListIsLoading(true))
    const params = getRequestParams(searchParams, page, pageSize);
    resendingAPI.getResendingList(params)
        .then((response) => {
            const totalPages = response.totalPages
            const data = response.data
            const totalItems = response.totalItems
            dispatch(setResendingList(data, totalPages))
            dispatch(setResendingListIsLoading(false))
            if (totalItems === 0) {
                dispatch(showAlert({ text: `Записи не найдены`, severity: 'info', title: 'Поиск' }));
            }
        })
        .catch((e) => {
            dispatch(setResendingListIsLoading(false))
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
                    list.push({ value:'', label: 'по умолчанию' })
                    dispatch(setSearchList(listName, { data: list, isLoading: false }));
                })
                .catch((e) => {
                    dispatch(showAlert({ text: `Ошибка получения списка. ${e}`, severity: 'error', title: 'Ошибка' }));
                })
            break;
        default:
    }
};