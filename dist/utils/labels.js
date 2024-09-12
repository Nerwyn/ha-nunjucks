export function labels(hass, lookup_value) {
    try {
        const areas = hass['areas'];
        const devices = hass['devices'];
        const entities = hass['entities'];
        if (!lookup_value) {
            const labelArr = [];
            for (const ids of [entities, devices, areas]) {
                for (const id in ids) {
                    labelArr.push(...(ids[id].labels ?? []));
                }
            }
            labelArr.sort();
            return Array.from(new Set(labelArr));
        }
        return (entities[lookup_value]?.labels ??
            devices[lookup_value]?.labels ??
            areas[lookup_value]?.labels);
    }
    catch {
        return [];
    }
}
export function label_areas(hass, label_id) {
    try {
        const areaIds = [];
        if (label_id) {
            const areas = hass['areas'];
            for (const areaId in areas) {
                if ((areas[areaId].labels ?? []).includes(label_id)) {
                    areaIds.push(areaId);
                }
            }
            areaIds.sort();
        }
        return areaIds;
    }
    catch {
        return [];
    }
}
export function label_devices(hass, label_id) {
    try {
        const deviceIds = [];
        if (label_id) {
            const devices = hass['devices'];
            for (const devicesId in devices) {
                if ((devices[devicesId].labels ?? []).includes(label_id)) {
                    deviceIds.push(devicesId);
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
export function label_entities(hass, label_id) {
    try {
        const entityIds = [];
        if (label_id) {
            const entities = hass['entities'];
            for (const entityId in entities) {
                if ((entities[entityId].labels ?? []).includes(label_id)) {
                    entityIds.push(entityId);
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
