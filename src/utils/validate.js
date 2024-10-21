export const setFieldsAsRequired = (fieldIdsArr, values, errors) => {
    const retErrors = { ...errors }

    fieldIdsArr.forEach(fieldId => {
        if (!values[fieldId]) { retErrors[fieldId] = '*' }
    })

    return retErrors
}

// проверка полей с помощью регулярного выражения
export const checkFieldsByRegExp = (fieldIdsArr, regExp, values, errors) => {
    const retErrors = { ...errors }

    fieldIdsArr.forEach(fieldId => {
        if (values[fieldId]) {
            if (!values[fieldId].match(regExp)) { retErrors[fieldId] = 'incorrectFormat' }
        }
    })
    return retErrors
}

//маппинг, какие поля обязатаельным для заполнения
export const requiredFields = {
    'system': {
        'sm': ['name', 'UserId', 'ResponsibleFIO', 'ResponsibleEmail', 'ResponsiblePhone', 'WSUrlBase', 'AuthType'],
        '4me (json)': ['name', 'UserId', 'ResponsibleFIO', 'ResponsibleEmail', 'ResponsiblePhone', 'WSUrlBase', 'AuthType'],
        'default': ['name', 'ResponsibleFIO', 'ResponsibleEmail', 'ResponsiblePhone']
    }
}

export const getRequiredFields = (tablename, dataStructure, type) => {
    let result = [];
    const tableFields = requiredFields[tablename];

    if (tableFields) {
        result = tableFields[dataStructure] ? tableFields[dataStructure] : tableFields[type] ? tableFields[type] : tableFields['default']
    }
    
    return result;
}