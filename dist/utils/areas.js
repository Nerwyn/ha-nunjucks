"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areas = areas;
exports.area_id = area_id;
exports.area_name = area_name;
exports.area_entities = area_entities;
exports.area_devices = area_devices;
function areas(hass) {
    try {
        return Object.keys(hass['areas']);
    }
    catch {
        return [];
    }
}
function area_id(hass, lookup_value) {
    try {
        if (lookup_value) {
            const areas = hass['areas'];
            const devices = hass['devices'];
            const entities = hass['entities'];
            if (entities[lookup_value]) {
                if (entities[lookup_value].area_id) {
                    return entities[lookup_value].area_id;
                }
                lookup_value = entities[lookup_value].device_id ?? lookup_value;
            }
            if (devices[lookup_value]) {
                return devices[lookup_value].area_id;
            }
            for (const areaId in areas) {
                if (areas[areaId].name == lookup_value) {
                    return areaId;
                }
            }
        }
        return undefined;
    }
    catch {
        return undefined;
    }
}
function area_name(hass, lookup_value) {
    try {
        if (lookup_value) {
            const areas = hass['areas'];
            const devices = hass['devices'];
            const entities = hass['entities'];
            let areaId = lookup_value;
            if (entities[lookup_value]) {
                areaId = entities[lookup_value].area_id ?? areaId;
                lookup_value = entities[lookup_value].device_id ?? lookup_value;
            }
            if (devices[lookup_value]) {
                areaId = devices[lookup_value].area_id ?? areaId;
            }
            if (areas[areaId]) {
                return areas[areaId].name;
            }
        }
        return undefined;
    }
    catch {
        return undefined;
    }
}
function area_entities(hass, area_name_or_id) {
    try {
        const entityIds = [];
        if (area_name_or_id) {
            const deviceIds = area_devices(hass, area_name_or_id);
            const entities = hass['entities'];
            for (const deviceId of deviceIds) {
                for (const entityId in entities) {
                    if (entities[entityId].device_id == deviceId) {
                        entityIds.push(entityId);
                    }
                }
            }
            entityIds.sort();
        }
        return entityIds;
    }
    catch {
        return [];
    }
}
function area_devices(hass, area_name_or_id) {
    try {
        const deviceIds = [];
        if (area_name_or_id) {
            const areas = hass['areas'];
            const devices = hass['devices'];
            if (!(area_name_or_id in areas)) {
                for (const areaId in areas) {
                    if (areas[areaId].name == area_name_or_id) {
                        area_name_or_id = areaId;
                        break;
                    }
                }
            }
            for (const deviceId in devices) {
                if (devices[deviceId].area_id == area_name_or_id) {
                    deviceIds.push(deviceId);
                }
            }
            deviceIds.sort();
        }
        return deviceIds;
    }
    catch {
        return [];
    }
}
