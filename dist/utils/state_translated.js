export function state_translated(hass, entity_id, state) {
    try {
        return hass.formatEntityState(hass.states[entity_id], state);
    }
    catch {
        return state ?? hass.states[entity_id]?.state ?? undefined;
    }
}
export function attr_name_translated(hass, entity_id, attr_name) {
    try {
        return hass.formatEntityAttributeName(hass.states[entity_id], attr_name);
    }
    catch {
        return (attr_name ??
            hass.states[entity_id]?.attributes?.[attr_name] ??
            undefined);
    }
}
export function attr_value_translated(hass, entity_id, attr_name, attr_value) {
    try {
        return hass.formatEntityAttributeValue(hass.states[entity_id], attr_name, attr_value);
    }
    catch {
        return (attr_value ??
            hass.states[entity_id]?.attributes?.[attr_name] ??
            undefined);
    }
}
export function number_translated(value) {
    if (isNaN(value)) {
        return value;
    }
    return window.haNunjucks.numberFormat.format(value);
}
export function date_translated(value) {
    try {
        return window.haNunjucks.dateFormat.format(value.jsDate);
    }
    catch {
        return value;
    }
}
export function time_translated(value) {
    try {
        return window.haNunjucks.timeFormat.format(value.jsDate);
    }
    catch {
        return value;
    }
}
export function datetime_translated(value) {
    try {
        return window.haNunjucks.datetimeFormat.format(value.jsDate);
    }
    catch {
        return value;
    }
}
