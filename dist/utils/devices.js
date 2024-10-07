import { entityRegistry } from './entities';
import { state_attr } from './states';
export const deviceRegistry = (hass) => hass['devices'];
export function device_entities(hass, device_id) {
    try {
        const res = [];
        if (device_id) {
            for (const entityId in entityRegistry(hass)) {
                if (entityRegistry(hass)[entityId].device_id == device_id) {
                    res.push(entityId);
                }
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
        return (deviceRegistry(hass)[device_or_entity_id]?.[attr_name] ??
            state_attr(hass, device_or_entity_id, attr_name));
    }
    catch {
        return undefined;
    }
}
export function is_device_attr(hass, device_or_entity_id, attr_name, attr_value) {
    try {
        if (attr_value != undefined) {
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
        return false;
    }
    catch {
        return false;
    }
}
export function device_id(hass, entity_id) {
    try {
        if (entity_id) {
            if (entityRegistry(hass)[entity_id]) {
                return entityRegistry(hass)[entity_id].device_id;
            }
            for (const deviceId in deviceRegistry(hass)) {
                const device = deviceRegistry(hass)[deviceId];
                if (device.name == entity_id ||
                    device.name_by_user == entity_id) {
                    return deviceId;
                }
            }
        }
        return undefined;
    }
    catch {
        return undefined;
    }
}
