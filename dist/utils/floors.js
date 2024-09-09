export function floors(hass) {
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
export function floor_id(hass, lookup_value) {
    try {
        const areas = hass['areas'];
        const devices = hass['devices'];
        const entities = hass['entities'];
        let area = lookup_value;
        if (entities[lookup_value]) {
            lookup_value = entities[lookup_value].device_id;
        }
        if (lookup_value) {
            if (devices[lookup_value]) {
                area = devices[lookup_value].area_id;
            }
            if (areas[area]) {
                return areas[area].floor_id;
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
export function floor_areas(hass, floor_id) {
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
