export function floors(hass) {
    try {
        return hass.connection._floorRegistry.state.map((floor) => floor.floor_id);
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
        return undefined;
    }
    catch {
        return undefined;
    }
}
export function floor_name(hass, lookup_value) {
    try {
        const areas = hass['areas'];
        const devices = hass['devices'];
        const entities = hass['entities'];
        const floors = hass.connection._floorRegistry.state;
        let areaId = lookup_value;
        if (entities[lookup_value]) {
            lookup_value = entities[lookup_value].device_id;
        }
        if (devices[lookup_value]) {
            areaId = devices[lookup_value].area_id;
        }
        let floorId = lookup_value;
        if (areas[areaId]) {
            floorId = areas[areaId].floor_id;
        }
        return floors.filter((floor) => floor.floor_id == floorId)[0].name;
    }
    catch {
        return undefined;
    }
}
export function floor_areas(hass, floor_name_or_id) {
    try {
        const res = [];
        const floors = hass.connection._floorRegistry.state;
        const floorId = floors.filter((floor) => floor.name == floor_name_or_id)[0]
            ?.floor_id ?? floor_name_or_id;
        const areas = hass['areas'];
        for (const areaId in areas) {
            if (areas[areaId].floor_id == floorId) {
                res.push(areaId);
            }
        }
        return res;
    }
    catch {
        return [];
    }
}
