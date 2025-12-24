export async function fetchEntityRegistry(hass) {
    const entities = await hass.connection.sendMessagePromise({
        type: 'config/entity_registry/list',
    });
    entities.sort((ent1, ent2) => ent1.entity_id.localeCompare(ent2.entity_id));
    for (const entity of entities) {
        window.haNunjucks.entityRegistry[entity.entity_id] = entity;
    }
}
export function is_hidden_entity(hass, entity_id) {
    try {
        return hass.entities[entity_id].hidden ?? false;
    }
    catch {
        return false;
    }
}
