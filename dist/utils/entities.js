export async function fetchEntityRegistry(hass) {
    window.haNunjucks.entityRegistry = await hass.connection.sendMessagePromise({
        type: 'config/entity_registry/list',
    });
}
export function is_hidden_entity(hass, entity_id) {
    try {
        return hass.entities[entity_id].hidden ?? false;
    }
    catch {
        return false;
    }
}
