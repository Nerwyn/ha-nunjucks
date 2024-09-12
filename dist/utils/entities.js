export function is_hidden_entity(hass, entity_id) {
    try {
        return (hass['entities'][entity_id].hidden ?? false);
    }
    catch {
        return false;
    }
}
