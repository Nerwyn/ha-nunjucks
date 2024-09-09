export function labels(hass, lookup_value) {
    try {
        if (!lookup_value) {
            const labels = hass.connection._labelRegistry.state;
            return labels.map((label) => label.label_id);
        }
        const areas = hass['areas'];
        const devices = hass['devices'];
        const entities = hass['entities'];
        return (entities[lookup_value]?.labels ??
            devices[lookup_value]?.labels ??
            areas[lookup_value]?.labels);
    }
    catch {
        return [];
    }
}
export function label_id(hass, lookup_value) {
    try {
        const labels = hass.connection._labelRegistry.state;
        return labels.filter((label) => label.name == lookup_value)[0].label_id;
    }
    catch {
        return undefined;
    }
}
export function label_name(hass, lookup_value) {
    try {
        const labels = hass.connection._labelRegistry.state;
        return labels.filter((label) => label.label_id == lookup_value)[0].name;
    }
    catch {
        return undefined;
    }
}
export function label_areas(hass, label_name_or_id) {
    try {
        const labelId = label_id(hass, label_name_or_id) ?? label_name_or_id;
        const areas = hass['areas'];
        const areaIds = [];
        for (const areaId in areas) {
            if ((areas[areaId].labels ?? []).includes(labelId)) {
                areaIds.push(areaId);
            }
        }
        areaIds.sort();
        return areaIds;
    }
    catch {
        return [];
    }
}
export function label_devices(hass, label_name_or_id) {
    try {
        const labelId = label_id(hass, label_name_or_id) ?? label_name_or_id;
        const devices = hass['devices'];
        const deviceIds = [];
        for (const devicesId in devices) {
            if ((devices[devicesId].labels ?? []).includes(labelId)) {
                deviceIds.push(devicesId);
            }
        }
        deviceIds.sort();
        return deviceIds;
    }
    catch {
        return [];
    }
}
export function label_entities(hass, label_name_or_id) {
    try {
        const labelId = label_id(hass, label_name_or_id) ?? label_name_or_id;
        const entities = hass['entities'];
        const entityIds = [];
        for (const entityId in entities) {
            if ((entities[entityId].labels ?? []).includes(labelId)) {
                entityIds.push(entityId);
            }
        }
        entityIds.sort();
        return entityIds;
    }
    catch {
        return [];
    }
}
