export function integration_entities(hass, integration) {
    try {
        if (!integration) {
            return [];
        }
        // Integration
        const entityIds = [];
        for (const entityId in hass.entities) {
            if (hass.entities[entityId].platform == integration) {
                entityIds.push(entityId);
            }
        }
        if (entityIds.length) {
            entityIds.sort();
            return entityIds;
        }
        // Config entry title
        const configEntryIds = window.haNunjucks.configEntries.title2EntryId[integration];
        for (const entryId of configEntryIds) {
            entityIds.push(...window.haNunjucks.entityRegistry.configEntryId2EntityIds[entryId]);
        }
        entityIds.sort();
        return entityIds.filter(Boolean);
    }
    catch {
        return [];
    }
}
