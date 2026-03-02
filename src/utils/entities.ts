import { HomeAssistant } from '../models/interfaces/hass';
import { EntityRegistryEntry } from '../models/interfaces/registries';

export async function fetchEntityRegistry(hass: HomeAssistant) {
	const entities: EntityRegistryEntry[] =
		await hass.connection.sendMessagePromise({
			type: 'config/entity_registry/list',
		});

	const entityId2ConfigEntryId: Record<string, string> = {};
	const configEntryId2EntityIds: Record<string, string[]> = {};
	for (const entity of entities) {
		if (entity.config_entry_id) {
			entityId2ConfigEntryId[entity.entity_id] = entity.config_entry_id;
			configEntryId2EntityIds[entity.config_entry_id] ??= [];
			configEntryId2EntityIds[entity.config_entry_id].push(entity.entity_id);
		}
	}

	window.haNunjucks.entityRegistry = {
		...window.haNunjucks.entityRegistry,
		entityId2ConfigEntryId,
		configEntryId2EntityIds,
	};
}

export function is_hidden_entity(hass: HomeAssistant, entity_id: string) {
	try {
		return hass.entities[entity_id].hidden ?? false;
	} catch {
		return false;
	}
}
