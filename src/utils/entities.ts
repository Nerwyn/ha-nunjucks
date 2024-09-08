import { HomeAssistant } from 'custom-card-helpers';

export function is_hidden_entity(hass: HomeAssistant, entity_id: string) {
	try {
		return (
			(
				hass['entities' as keyof HomeAssistant] as unknown as Record<
					string,
					Record<string, string>
				>
			)[entity_id].hidden ?? false
		);
	} catch {
		return false;
	}
}
