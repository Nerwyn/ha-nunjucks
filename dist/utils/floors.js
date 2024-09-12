"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floors = floors;
exports.floor_id = floor_id;
exports.floor_areas = floor_areas;
function floors(hass) {
    try {
        const areas = hass['areas'];
        const floorArr = [];
        for (const areaId in areas) {
            floorArr.push(areas[areaId].floor_id);
        }
        floorArr.sort();
        return Array.from(new Set(floorArr));
    }
    catch {
        return undefined;
    }
}
function floor_id(hass, lookup_value) {
    try {
        const areas = hass['areas'];
        const devices = hass['devices'];
        const entities = hass['entities'];
        let areaId = lookup_value;
        if (entities[lookup_value]) {
            areaId = entities[lookup_value].area_id ?? areaId;
            lookup_value = entities[lookup_value].device_id ?? lookup_value;
        }
        if (lookup_value) {
            if (devices[lookup_value]) {
                areaId = devices[lookup_value].area_id ?? areaId;
            }
            if (areas[areaId]) {
                return areas[areaId].floor_id;
            }
            else {
                for (const areaId in areas) {
                    if (areas[areaId].name == lookup_value) {
                        return areas[areaId].floor_id;
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
function floor_areas(hass, floor_id) {
    try {
        const res = [];
        if (floor_id) {
            const areas = hass['areas'];
            for (const areaId in areas) {
                if (areas[areaId].floor_id == floor_id) {
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
