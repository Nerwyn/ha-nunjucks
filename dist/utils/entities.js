export async function fetchEntityRegistry(hass) {
    const entities = await hass.connection.sendMessagePromise({
        type: 'config/entity_registry/list',
    });
    const entityId2ConfigEntryId = {};
    const configEntryId2EntityIds = {};
    for (const entity of entities) {
        if (entity.config_entry_id) {
            entityId2ConfigEntryId[entity.entity_id] = entity.config_entry_id;
            configEntryId2EntityIds[entity.config_entry_id] ??= [];
            configEntryId2EntityIds[entity.config_entry_id].push(entity.entity_id);
        }
    }
    window.haNunjucks.entityRegistry = {
        entityId2ConfigEntryId,
        configEntryId2EntityIds,
    };
}
export function is_hidden_entity(hass, entity_id) {
    try {
        return hass.entities[entity_id].hidden ?? false;
    }
    catch {
        return false;
    }
}
