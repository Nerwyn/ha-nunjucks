export function integration_entities(hass, integration) {
    try {
        const entityIds = [];
        if (integration) {
            for (const entityId in hass.entities) {
                if (hass.entities[entityId].platform == integration) {
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
