import { HomeAssistant } from '../models/hass';

export function is_hidden_entity(hass: HomeAssistant, entity_id: string) {
	try {
		return hass.entities[entity_id].hidden ?? false;
	} catch {
		return false;
	}
}
