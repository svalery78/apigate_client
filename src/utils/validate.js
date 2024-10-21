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