import { objectAPI } from "../api/object";
import { systemAPI } from '../api/system';
import { stpAPI } from '../api/stp';
import { getRequestParams, clearObjEmptyStrings } from '../utils/custom';
import { showAlert } from "./mainReducer";

let initialState = {
    record: {
        data: {
            _id: '',
            status: '',
            date: '',
            DescriptionShort: '',
            DescriptionFull: '',
            ContactFIO: '',
            ContactEmail: '',
            ContactPhone: '',
            SystemSourceID: '',
            SystemSourceName: '',
            SystemSourceObjCode: '',
            SystemSourceComment: '',
            SystemSourceAttach: [],
            SystemAddresseeID: '',
            SystemAddresseeSTPID: '',
            SystemAddresseeObjCode: '',
            SystemAddresseeComment: '',
            SystemAddresseeAttach: ''
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
        objectList: { data: [], isLoading: false },
        systemList: { data: [], isLoading: false },
        stpList: { data: [], isLoading: false }
    }
}

export const objectReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'APIGATE/OBJECT/SET_OBJECT_RECORD':
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
            case 'APIGATE/OBJECT/SET_RECORD_IS_LOADING':
                return {
                    ...state,
                    record: {
                        ...state.record,
                        isLoading: action.value
                    }
                }
        case 'APIGATE/OBJECT/SET_OBJECT_LIST':
            return {
                ...state,
                list: {
                    ...state.list,
                    data: action.data,
                    count: action.count
                }
            }
        case 'APIGATE/OBJECT/SET_OBJECT_LIST_IS_LOADING':
            return {
                ...state,
                list: {
                    ...state.list,
                    isLoading: action.value
                }
            }
        case 'APIGATE/OBJECT/SET_SEARCH_FILTER':
            const searchFilter = clearObjEmptyStrings(action.data);
            return {
                ...state,
                searchFilter: searchFilter,
                list: { ...state.list, page: 1 }
            }
        case 'APIGATE/OBJECT/SET_SEARCH_LIST':
            return {
                ...state,
                searchLists: {
                    ...state.searchLists,
                    [action.name]: action.value
                }
            }
        case 'APIGATE/OBJECT/SET_SEARCH_LIST_IS_LOADING':
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
        case 'APIGATE/OBJECT/SET_PAGE':
            return {
                ...state,
                list: { ...state.list, page: action.page }
            }

        default:
            return state;
    }
}
export const setCurrentPage = (page) => ({ type: 'APIGATE/OBJECT/SET_PAGE', page })
const setObjectRecord = (value) => ({ type: 'APIGATE/OBJECT/SET_OBJECT_RECORD', value: value })
const setRecordIsLoading = (value) => ({ type: 'APIGATE/OBJECT/SET_RECORD_IS_LOADING', value: value })
const setObjectList = (data, count) => ({ type: 'APIGATE/OBJECT/SET_OBJECT_LIST', data, count })
const setObjectListIsLoading = (value) => ({ type: 'APIGATE/OBJECT/SET_OBJECT_LIST_IS_LOADING', value })
export const setSearchFilter = (data) => ({ type: 'APIGATE/OBJECT/SET_SEARCH_FILTER', data })
const setSearchList = (name, value) => ({ type: 'APIGATE/OBJECT/SET_SEARCH_LIST', name, value });
const setSearchListIsLoading = (name, value) => ({ type: 'APIGATE/OBJECT/SET_SEARCH_LIST_IS_LOADING', name, value })

export const getObject = (id) => async (dispatch) => {
    try {
        dispatch(setRecordIsLoading(true));
        let record = await objectAPI.getObject(id)
        if (record) {
            dispatch(setObjectRecord(record))
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка получения объекта. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const saveObject = (data, id, refreshList) => async (dispatch) => {
    try {
        const response = await objectAPI.saveObject(data, id)
        //TODO: какое условие если статус === Отклонен
        if (response || response.Status === 'Зарегистрирован') {
            dispatch(showAlert({ text: 'Объект обновлён', severity: 'success', title: 'Обновление' }));
            refreshList();
        }
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка обновления объекта. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const createObject = (data, id) => async (dispatch) => {
    try {
        await objectAPI.createObject(data, id)
    } catch (e) {
        dispatch(showAlert({ text: `Ошибка создания объекта. ${e}`, severity: 'error', title: 'Ошибка' }));
    }
}
export const retrieveObject = (searchParams, page, pageSize) => (dispatch) => {
    dispatch(setObjectListIsLoading(true))
    const params = getRequestParams(searchParams, page, pageSize);
    objectAPI.getObjectList(params)
        .then((response) => {
            const totalPages = response.totalPages
            const totalItems = response.totalItems
            const data = response.data.map(rowData => {
                return {
                    ...rowData,
                    SystemSourceAttach: JSON.stringify(rowData.SystemSourceAttach),
                }
            });
            dispatch(setObjectList(data, totalPages))
            dispatch(setObjectListIsLoading(false))
            if (totalItems === 0) {
                dispatch(showAlert({ text: `Записи не найдены`, severity: 'info', title: 'Поиск' }));
            }
        })
        .catch((e) => {
            dispatch(setObjectListIsLoading(false));
            dispatch(showAlert({ text: `Ошибка получения списка. ${e}`, severity: 'error', title: 'Ошибка' }));
        })
};

export const retrieveSearchLists = (listName) => (dispatch) => {
    switch (listName) {
        // case 'objectList':
        //     dispatch(setSearchListIsLoading(listName, true));
        //     objectAPI.getObjectList()
        //         .then((response) => {
        //             const data = response.data;
        //             const list = data.map((object) => {
        //                 return { value: object.SystemSourceID, label: object.SystemSourceName }
        //             })
        //             dispatch(setSearchList(listName, { data: list, isLoading: false }));
        //         })
        //         .catch((e) => {
        //             dispatch(showAlert({ text: `Ошибка получения списка. ${e}`, severity: 'error', title: 'Ошибка' }));
        //         })
        //     break;
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
        case 'stpList':
            dispatch(setSearchListIsLoading(listName, true));
            stpAPI.getStpList()
                .then((response) => {
                    const data = response.data;
                    const list = data.map((stp) => {
                        return { value: stp._id, label: stp.name }
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