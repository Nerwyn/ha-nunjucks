"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_hidden_entity = is_hidden_entity;
function is_hidden_entity(hass, entity_id) {
    try {
        return (hass['entities'][entity_id].hidden ?? false);
    }
    catch {
        return false;
    }
}
