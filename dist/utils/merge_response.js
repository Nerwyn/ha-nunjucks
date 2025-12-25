export function merge_response(value) {
    if (!(typeof value == 'object') || Array.isArray(value)) {
        throw Error('Response is not a dictionary');
    }
    if (!value || !Object.keys(value).length) {
        return [];
    }
    let isSingleList = false;
    const responses = [];
    for (const [entityId, entityResponse] of Object.entries(value)) {
        if (!(typeof entityResponse == 'object') || Array.isArray(entityResponse)) {
            throw Error('Response is not a dictionary');
        }
        for (const [valueKey, typeResponse] of Object.entries(entityResponse)) {
            if (Object.keys(entityResponse).length == 1 &&
                Array.isArray(typeResponse)) {
                isSingleList = true;
                for (const dictInList of typeResponse) {
                    if (typeof dictInList == 'object' && !Array.isArray(dictInList)) {
                        if (dictInList.entity_id) {
                            throw Error('Response dictionary already contains key entity_id');
                        }
                        dictInList.entity_id = entityId;
                        dictInList.value_key = valueKey;
                    }
                }
                responses.push(...typeResponse);
            }
            else {
                break;
            }
        }
        if (!isSingleList && !Array.isArray(entityResponse)) {
            if (entityResponse.entity_id) {
                throw Error('Response dictionary already contains key entity_id');
            }
            entityResponse['entity_id'] = entityId;
            responses.push(entityResponse);
        }
    }
    return responses;
}
