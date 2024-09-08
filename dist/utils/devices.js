import { state_attr } from './states';
export function device_entities(hass, device_id) {
    try {
        const res = [];
        const entities = hass['entities'];
        for (const entityId in entities) {
            if (entities[entityId].device_id == device_id) {
                res.push(entityId);
            }
        }
        return res;
    }
    catch {
        return [];
    }
}
export function device_attr(hass, device_or_entity_id, attr_name) {
    try {
        const devices = hass['devices'];
        return (devices[device_or_entity_id]?.[attr_name] ??
            state_attr(hass, device_or_entity_id, attr_name));
    }
    catch {
        return undefined;
    }
}
export function is_device_attr(hass, device_or_entity_id, attr_name, attr_value) {
    try {
        const deviceAttr = device_attr(hass, device_or_entity_id, attr_name);
        if (typeof attr_value == 'string' &&
            attr_value.startsWith('[') &&
            attr_value.endsWith(']')) {
            attr_value = JSON.parse(attr_value);
        }
        if (Array.isArray(attr_value)) {
            return attr_value.includes(deviceAttr);
        }
        return deviceAttr == attr_value;
    }
    catch {
        return false;
    }
}
export function device_id(hass, entity_id) {
    try {
        const entities = hass['entities'];
        if (entities[entity_id]) {
            return entities[entity_id].device_id;
        }
        const devices = hass['devices'];
        for (const deviceId in devices) {
            const device = devices[deviceId];
            if (device.name == entity_id || device.name_by_user == entity_id) {
                return deviceId;
            }
        }
    }
    catch {
        return undefined;
    }
}
