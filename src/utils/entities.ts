import { HomeAssistant } from '../models/interfaces/hass';

export async function fetchEntityRegistry(hass: HomeAssistant) {
	window.haNunjucks.entityRegistry = await hass.connection.sendMessagePromise({
		type: 'config/entity_registry/list',
	});
}

export function is_hidden_entity(hass: HomeAssistant, entity_id: string) {
	try {
		return hass.entities[entity_id].hidden ?? false;
	} catch {
		return false;
	}
}
