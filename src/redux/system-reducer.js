import { systemAPI } from "../api/system";
import { userAPI } from "../api/user";
import { getRequestParams, clearObjEmptyStrings } from '../utils/custom';
import { showAlert } from "./mainReducer";

let initialState = {
    record: {
        data: {
            _id: "",
            name: "",
            type: "",
            UserId: "",
            ResponsibleFIO: "",
            ResponsibleEmail: "",
            ResponsiblePhone: "",
            WSUrlBase: "",
            WSLogin: "",
            WSPassword: "",
            WSHeader: "",
            StpWSUrlPath: "",
            WSUrlAttach: {}
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
        systemList: { data: [], isLoading: false },
        userList: { data: [], isLoading: false },
    }
}

export const systemReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'APIGATE/SYSTEM/SET_SYSTEM_RECORD':
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
        case 'APIGATE/SYSTEM/SET_RECORD_IS_LOADING':
            return {
                ...state,
                record: {
                    ...state.record,
                    isLoading: action.value
                }
            }
        case 'APIGATE/SYSTEM/SET_SYSTEM_LIST':
            return {
                ...state,
                list: {
                    ...state.list,
                    data: action.data,
                    count: action.count
                }
            }
        case 'APIGATE/SYSTEM/SET_SYSTEM_LIST_IS_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    isLoading: action.value
                }
            }
        case 'APIGATE/SYSTEM/SET_SEARCH_FILTER':
            const searchFilter = clearObjEmptyStrings(action.data);
            return {
                ...state,
                searchFilter: searchFilter,
                list: { ...state.list, page: 1 }
            }
        case 'APIGATE/SYSTEM/SET_SEARCH_LIST':
            return {
                ...state,
                searchLists: {
                    ...state.searchLists,
                    [action.name]: action.value
                }
            }
        case 'APIGATE/SYSTEM/SET_SEARCH_LIST_IS_LOADING':
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
        case 'APIGATE/SYSTEM/SET_PAGE':
            return {
                ...state,
                list: { ...state.list, page: action.page }
            }
        default:
            return state;
    }
}
export const setCurrentPage = (page) => ({ type: 'APIGATE/SYSTEM/SET_PAGE', page })
const setSystemRecord = (value) => ({ type: 'APIGATE/SYSTEM/SET_SYSTEM_RECORD', value: value })
const setRecordIsLoading = (value) => ({ type: 'APIGATE/SYSTEM/SET_RECORD_IS_LOADING', value: value })
const setSystemList = (data, count) => ({ type: 'APIGATE/SYSTEM/SET_SYSTEM_LIST', data, count })
const setSystemListIsLoading = (value) => ({ type: 'APIGATE/SYSTEM/SET_SYSTEM_LIST_IS_LOADING', value })
export const setSearchFilter = (data) => ({ type: 'APIGATE/SYSTEM/SET_SEARCH_FILTER', data })
const setSearchList = (name, value) => ({ type: 'APIGATE/SYSTEM/SET_SEARCH_LIST', name, value });
const setSearchListIsLoading = (name, value) => ({ type: 'APIGATE/SYSTEM/SET_SEARCH_LIST_IS_LOADING', name, value })

export const getSystem = (id) => async (dispatch) => {
    try {
        dispatch(setRecordIsLoading(true));
        let record = await systemAPI.getSystem(id)
        if (record) {
            dispatch(setSystemRecord(record))
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка запроса Системы. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const saveSystem = (data, id, refreshList) => async (dispatch) => {
    try {
        const response = await systemAPI.saveSystem(data, id)
        if (response) {
            dispatch(showAlert({ text: 'Система обновлена', severity: 'success', title: 'Обновление' }));
            refreshList();
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка обновленя Системы. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const createSystem = (data, id, refreshList) => async (dispatch) => {
    try {
        const response = await systemAPI.createSystem(data, id)
        if (response.id) {
            dispatch(showAlert({ text: 'Система создана', severity: 'success', title: 'Создание' }));
            refreshList();
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка создания Системы. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const retrieveSystem = (searchParams, page, pageSize) => (dispatch) => {
    dispatch(setSystemListIsLoading(true));
    const params = getRequestParams(searchParams, page, pageSize);
    systemAPI.getSystemList(params)
        .then((response) => {
            const totalPages = response.totalPages
            const data = response.data;
            const totalItems = response.totalItems;
            dispatch(setSystemList(data, totalPages))
            dispatch(setSystemListIsLoading(false));
            if (totalItems === 0) {
                dispatch(showAlert({ text: `Записи не найдены`, severity: 'info', title: 'Поиск' }));
            }
        })
        .catch((e) => {
            dispatch(setSystemListIsLoading(false));
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
        case 'userList':
            dispatch(setSearchListIsLoading(listName, true));
            userAPI.getUserList()
                .then((response) => {
                    const data = response.data;
                    const list = data.map((user) => {
                        return { value: user._id, label: user.login }
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