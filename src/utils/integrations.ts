import { HomeAssistant } from 'custom-card-helpers';

export function integration_entities(hass: HomeAssistant, integration: string) {
	try {
		const entityIds = [];
		if (integration) {
			const entities = hass['entities' as keyof HomeAssistant] as Record<
				string,
				Record<string, string>
			>;
			for (const entityId in entities) {
				if (entities[entityId].platform == integration) {
					entityIds.push(entityId);
				}
			}
			entityIds.sort();
		}
		return entityIds;
	} catch {
		return [];
	}
}
