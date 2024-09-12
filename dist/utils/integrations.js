"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integration_entities = integration_entities;
function integration_entities(hass, integration) {
    try {
        const entityIds = [];
        if (integration) {
            const entities = hass['entities'];
            for (const entityId in entities) {
                if (entities[entityId].platform == integration) {
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
