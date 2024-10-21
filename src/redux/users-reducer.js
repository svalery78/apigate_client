import { userAPI } from '../api/user'
import { authAPI } from '../api/auth'
import { showAlert } from "./mainReducer";
import { getRequestParams, clearObjEmptyStrings } from '../utils/custom';

let initialState = {
    record: {
        data: {
            id: '',
            login: '',
            role: ''
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
        userList: { data: [], isLoading: false }
    }
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'APIGATE/USER/SET_USER_RECORD':
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
        case 'APIGATE/USER/SET_RECORD_IS_LOADING':
            return {
                ...state,
                record: {
                    ...state.record,
                    isLoading: action.value
                }
            }
        case 'APIGATE/USER/SET_USER_LIST':
            return {
                ...state,
                list: {
                    ...state.list,
                    data: action.data,
                    count: action.count
                }
            }
        case 'APIGATE/USER/SET_USER_LIST_IS_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    isLoading: action.value
                }
            }
        case 'APIGATE/USER/SET_SEARCH_FILTER':
            const searchFilter = clearObjEmptyStrings(action.data);
            return {
                ...state,
                searchFilter: searchFilter,
                list: { ...state.list, page: 1 }
            }
        case 'APIGATE/USER/SET_SEARCH_LIST':
            return {
                ...state,
                searchLists: {
                    ...state.searchLists,
                    [action.name]: action.value
                }
            }
        case 'APIGATE/USER/SET_SEARCH_LIST_IS_LOADING':
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
        case 'APIGATE/USER/SET_PAGE':
            return {
                ...state,
                list: { ...state.list, page: action.page }
            }
        default:
            return state;
    }
}
export const setCurrentPage = (page) => ({ type: 'APIGATE/USER/SET_PAGE', page })
export const setUserRecord = (value) => ({ type: 'APIGATE/USER/SET_USER_RECORD', value: value })
const setRecordIsLoading = (value) => ({ type: 'APIGATE/USER/SET_RECORD_IS_LOADING', value: value })
export const setUserList = (data, count) => ({ type: 'APIGATE/USER/SET_USER_LIST', data, count })
const setUserListIsLoading = (value) => ({ type: 'APIGATE/USER/SET_USER_LIST_IS_LOADING', value })
export const setSearchFilter = (data) => ({ type: 'APIGATE/USER/SET_SEARCH_FILTER', data })
const setSearchList = (name, value) => ({ type: 'APIGATE/USER/SET_SEARCH_LIST', name, value });
const setSearchListIsLoading = (name, value) => ({ type: 'APIGATE/USER/SET_SEARCH_LIST_IS_LOADING', name, value })

export const getUser = (id) => async (dispatch) => {
    try {
        dispatch(setRecordIsLoading(true));
        let record = await userAPI.getUser(id)
        dispatch(setUserRecord(record))
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка получения пользователя. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
//добавление пользователя
export const signupUser = (data, refreshList) => async (dispatch) => {
    try {
        let record = await authAPI.signupUser(data)
        if (record.id) {
            dispatch(showAlert({ text: 'Пользователь добавлен', severity: 'success', title: 'Создание' }));
            refreshList();
        }
        dispatch(setUserRecord(record))
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка добавления пользователя. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
//Обновление пользователя
export const saveUser = (data, id, refreshList) => async (dispatch) => {
    try {
        let record = await userAPI.saveUser(data, id)
        if (record.id) {
            dispatch(showAlert({ text: 'Пользователь обновлён', severity: 'success', title: 'Обновление' }));
            refreshList();
        }
        dispatch(setUserRecord(record))
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка обновления пользователя ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const retrieveUser = (searchParams, page, pageSize) => (dispatch) => {
    dispatch(setUserListIsLoading(true))
    const params = getRequestParams(searchParams, page, pageSize);
    userAPI.getUserList(params)
        .then((response) => {
            const totalPages = response.totalPages
            const data = response.data
            const totalItems = response.totalItems
            dispatch(setUserList(data, totalPages));
            dispatch(setUserListIsLoading(false))
            if (totalItems === 0) {
                dispatch(showAlert({ text: `Записи не найдены`, severity: 'info', title: 'Поиск' }));
            }
        })
        .catch((e) => {
            dispatch(setUserListIsLoading(false))
            dispatch(showAlert({ text: `Ошибка получения списка. ${e}`, severity: 'error', title: 'Ошибка' }));
        })
};
export const retrieveSearchLists = (listName) => (dispatch) => {
    switch (listName) {
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
