// маппинг для поиска
/*
$regex like
$gte >= 
$lte <= 
*/
export const fieldMapping = {
  rest: {
    ID: { name: '_id', type: 'ObjectId', operatorValue: '=' },
    objectID: { type: 'ObjectId', operatorValue: '=' },
    type: { operatorValue: '=' },
    tableName: { operatorValue: '=' },
    createdFrom: { name: 'data', operatorValue: '$gte' },
    createdBefore: { name: 'data', operatorValue: '$lte' },
    status: { operatorValue: '=' },
    url: { operatorValue: '$regex' },
    systemId: { type: 'ObjectId', operatorValue: '=' },
    info: { operatorValue: '$regex' },
  },
  object: {
    id: { name: '_id', type: 'ObjectId', operatorValue: '=' },
    Status: { operatorValue: '=' },
    ContactFIO: { operatorValue: '$regex' },
    ContactEmail: { operatorValue: '$regex' },
    ContactPhone: { operatorValue: '$regex' },
    createdFrom: { name: 'date', operatorValue: '$gte' },
    createdBefore: { name: 'date', operatorValue: '$lte' },
    SystemSourceID: { type: 'ObjectId', operatorValue: '=' },
    SystemSourceName: { name: 'SystemSourceID', type: 'ObjectId', operatorValue: '=' },
    SystemSourceСomment: { operatorValue: '$regex' },
    SystemAddresseeID: { type: 'ObjectId', operatorValue: '=' },
    SystemAddresseeSTPID: { type: 'ObjectId', operatorValue: '=' },
    SystemAddresseeObjCode: { operatorValue: '$regex' },
    SystemSourceObjCode: { operatorValue: '$regex' },
  },
  system: {
    id: { name: '_id', type: 'ObjectId', operatorValue: '=' },
    name: { operatorValue: '$regex' },
    type: { operatorValue: '=' },
    UserId: { type: 'ObjectId', operatorValue: '=' },
    ResponsibleFIO: { operatorValue: '$regex' },
    ResponsibleEmail: { operatorValue: '$regex' },
    ResponsiblePhone: { operatorValue: '$regex' },
    WSUrlBase: { operatorValue: '$regex' },
    WSLogin: { operatorValue: '$regex' },
    WSHeader: { operatorValue: '$regex' },
    StpWSUrlPath: { operatorValue: '$regex' },
  },
  stp: {
    ID: { name: '_id', type: 'ObjectId', operatorValue: '=' },
    name: { operatorValue: '$regex' },
    SystemID: { type: 'ObjectId', operatorValue: '=' },
    SystemName: { operatorValue: '=' },
    WSUrlPath: { operatorValue: '$regex' },
    blocking: { operatorValue: '=' }
  },
  user: {
    _id: { name: '_id', type: 'ObjectId', operatorValue: '=' },
    login: { operatorValue: '$regex' },
    role: { operatorValue: '$regex' },
  },
  setting: {
    id: { name: '_id', type: 'ObjectId', operatorValue: '=' },
    name: { operatorValue: '$regex' },
    value: { operatorValue: '$regex' },
  },
}

// получение обьекта параметров для поиска
export const getSearchParams = (tableName, data) => {
  let params = {};
  let mapping = fieldMapping[tableName]; 

  if (mapping) {
    for (let fieldname in data) {
      if (mapping[fieldname] && mapping[fieldname] !== '') {
        let dbFieldName = mapping[fieldname].name ? mapping[fieldname].name : fieldname;
        params[dbFieldName] = params[dbFieldName] || {};

        if (mapping[fieldname].operatorValue === '=') {
          if (mapping[fieldname].type === 'ObjectId') {
            params[dbFieldName] = data[fieldname].toLowerCase();
          } else {
            params[dbFieldName] = data[fieldname];
          }
        } else {
          let operatorValue = mapping[fieldname].operatorValue;
          params[dbFieldName][operatorValue] = data[fieldname];

          if (operatorValue === '$regex') {
            params[dbFieldName]['$options'] = 'i';
          }
        }
      }
    }
  }

  return params;
}


