export function integration_entities(hass, integration) {
    try {
        const entities = hass['entities'];
        const entityIds = [];
        for (const entityId in entities) {
            if (entities[entityId].platform == integration) {
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
