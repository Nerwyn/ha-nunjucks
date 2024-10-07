import { areaRegistry } from './areas';
import { deviceRegistry } from './devices';
import { entityRegistry } from './entities';
export const floorRegistry = (hass) => hass['floors'];
export function floors(hass) {
    return Object.keys(floorRegistry(hass));
}
export function floor_id(hass, lookup_value) {
    try {
        let areaId = lookup_value;
        if (entityRegistry(hass)[lookup_value]) {
            areaId = entityRegistry(hass)[lookup_value].area_id ?? areaId;
            lookup_value =
                entityRegistry(hass)[lookup_value].device_id ?? lookup_value;
        }
        if (lookup_value) {
            if (deviceRegistry(hass)[lookup_value]) {
                areaId = deviceRegistry(hass)[lookup_value].area_id ?? areaId;
            }
            if (areaRegistry(hass)[areaId]) {
                return areaRegistry(hass)[areaId].floor_id;
            }
            else {
                for (const areaId in areaRegistry(hass)) {
                    if (areaRegistry(hass)[areaId].name == lookup_value) {
                        return areaRegistry(hass)[areaId].floor_id;
                    }
                }
            }
        }
        return undefined;
    }
    catch {
        return undefined;
    }
}
export function floor_name(hass, lookup_value) {
    if (floorRegistry(hass)[lookup_value]) {
        return floorRegistry(hass)[lookup_value].name;
    }
    const floorId = floor_id(hass, lookup_value);
    if (floorId) {
        return floorRegistry(hass)[floorId].name;
    }
    return undefined;
}
export function floor_areas(hass, floor_name_or_id) {
    try {
        const res = [];
        if (floor_name_or_id) {
            let floorId = undefined;
            if (floorRegistry(hass)[floor_name_or_id]) {
                floorId = floor_name_or_id;
            }
            else {
                for (const id in Object.keys(floors)) {
                    if (floorRegistry(hass)[id].name == floor_name_or_id) {
                        floorId = floorRegistry(hass)[id].name;
                        break;
                    }
                }
            }
            if (!floorId) {
                return [];
            }
            for (const areaId in areaRegistry(hass)) {
                if (areaRegistry(hass)[areaId].floor_id == floorId) {
                    res.push(areaId);
                }
            }
        }
        return res;
    }
    catch {
        return [];
    }
}
