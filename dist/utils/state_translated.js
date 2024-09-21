export function state_translated(hass, entity_id, state) {
    try {
        return hass['formatEntityState'](hass.states[entity_id], state);
    }
    catch {
        return state ?? hass.states[entity_id]?.state ?? undefined;
    }
}
export function attr_name_translated(hass, entity_id, attr_name, attr_value) {
    try {
        return hass['formatEntityAttributeName'](hass.states[entity_id], attr_name, attr_value);
    }
    catch {
        return (attr_name ??
            hass.states[entity_id]?.attributes?.[attr_name] ??
            undefined);
    }
}
export function attr_value_translated(hass, entity_id, attr_name, attr_value) {
    try {
        return hass['formatEntityAttributeValue'](hass.states[entity_id], attr_name, attr_value);
    }
    catch {
        return (attr_value ??
            hass.states[entity_id]?.attributes?.[attr_name] ??
            undefined);
    }
}
