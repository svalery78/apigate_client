import { restAPI } from '../api/rest';
import { systemAPI } from '../api/system';
import { getRequestParams, clearObjEmptyStrings } from '../utils/custom';
import { showAlert } from "./mainReducer";

let initialState = {
    record: {
        data: {
            _id: '',
            tableName: '',
            objectID: '',
            type: '',
            data: '',
            status: '',
            url: '',
            request: '',
            result: '',
            sendTriesCount: '',
            systemId: '',
            info: '',
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
    showErrorsOnly: false,
    searchLists: {
        systemList: { data: [], isLoading: false }
    }
}

const restReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APIGATE/REST/SET_REST_RECORD':
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
        case 'APIGATE/REST/SET_RECORD_IS_LOADING':
            return {
                ...state,
                record: {
                    ...state.record,
                    isLoading: action.value
                }
            }
        case 'APIGATE/REST/SET_REST_LIST':
            return {
                ...state,
                list: {
                    ...state.list,
                    data: action.data,
                    count: action.count,

                }
            }
        case 'APIGATE/REST/SET_REST_LIST_IS_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    isLoading: action.value
                }
            }
        case 'APIGATE/REST/SET_SEARCH_FILTER':
            const searchFilter = clearObjEmptyStrings(action.data);
            return {
                ...state,
                searchFilter: searchFilter,
                list: { ...state.list, page: 1 }
            }
        case 'APIGATE/REST/SET_SHOW_ERRORS_ONLY':
            return {
                ...state,
                showErrorsOnly: action.value
            }
        case 'APIGATE/REST/SET_SEARCH_LIST':
            return {
                ...state,
                searchLists: {
                    ...state.searchLists,
                    [action.name]: action.value
                }
            }
        case 'APIGATE/REST/SET_SEARCH_LIST_IS_LOADING':
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
        case 'APIGATE/REST/SET_PAGE':
            return {
                ...state,
                list: { ...state.list, page: action.page }
            }
        default:
            return state;
    }
}
export const setCurrentPage = (page) => ({ type: 'APIGATE/REST/SET_PAGE', page })
const setRestRecord = (value) => ({ type: 'APIGATE/REST/SET_REST_RECORD', value: value })
const setRecordIsLoading = (value) => ({ type: 'APIGATE/REST/SET_RECORD_IS_LOADING', value: value })
const setRestList = (data, count) => ({ type: 'APIGATE/REST/SET_REST_LIST', data, count })
const setRestListIsLoading = (value) => ({ type: 'APIGATE/REST/SET_REST_LIST_IS_LOADING', value })
export const setSearchFilter = (data) => ({ type: 'APIGATE/REST/SET_SEARCH_FILTER', data })
export const setShowErrorsOnly = (value) => ({ type: 'APIGATE/REST/SET_SHOW_ERRORS_ONLY', value })
const setSearchList = (name, value) => ({ type: 'APIGATE/REST/SET_SEARCH_LIST', name, value });
const setSearchListIsLoading = (name, value) => ({ type: 'APIGATE/REST/SET_SEARCH_LIST_IS_LOADING', name, value })

export const getRest = (id) => async (dispatch) => {
    try {
        dispatch(setRecordIsLoading(true));
        let record = await restAPI.getRest(id);
        if (record) {
            dispatch(setRestRecord(record))
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка получения запроса. ${e}`, severity: 'error', title: 'Ошибка' }));
    }

}

// пока данный метод не нужен
export const saveRest = (data, id) => async (dispatch) => {
    try {
        //let response = await restAPI.saveRest(data, id)
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка сохранения запроса. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
// получение списка таблицы rest
export const retrieveRest = (searchParams, page, pageSize) => (dispatch) => {
    dispatch(setRestListIsLoading(true));
    const params = getRequestParams(searchParams, page, pageSize);
    restAPI.getRestList(params)
        .then((response) => {
            const totalPages = response.totalPages
            const totalItems= response.totalItems
            const data = response.data.map(rowData => {
                return {
                    ...rowData,
                    request: JSON.stringify(rowData.request),
                    result: JSON.stringify(rowData.result)
                }
            });
            dispatch(setRestList(data, totalPages));
            dispatch(setRestListIsLoading(false));
            if(totalItems === 0){
                dispatch(showAlert({ text: `Записи не найдены`, severity: 'info', title: 'Поиск' }));
            }
        })
        .catch((e) => {
            dispatch(setRestListIsLoading(false));
            dispatch(showAlert({ text: `Ошибка получения списка. ${e}`, severity: 'error', title: 'Ошибка' }));
        })
};

// повторение запроса
export const repeatRequest = (id) => (dispatch) => {
    restAPI.repeatRequest(id)
        .then((response) => {
        })
        .catch((e) => {
            dispatch(showAlert({ text: `Ошибка повторения запроса. ${e}`, severity: 'error', title: 'Ошибка' }));
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

export default restReducer;