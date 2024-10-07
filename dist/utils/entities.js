export const entityRegistry = (hass) => hass['entities'];
export function is_hidden_entity(hass, entity_id) {
    try {
        return entityRegistry(hass)[entity_id].hidden ?? false;
    }
    catch {
        return false;
    }
}
