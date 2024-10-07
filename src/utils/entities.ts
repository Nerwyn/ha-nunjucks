import { HomeAssistant } from 'custom-card-helpers';

type EntityCategory = 'config' | 'diagnostic';
export interface EntityRegistryDisplayEntry {
	entity_id: string;
	name?: string;
	icon?: string;
	device_id?: string;
	area_id?: string;
	labels: string[];
	hidden?: boolean;
	entity_category?: EntityCategory;
	translation_key?: string;
	platform?: string;
	display_precision?: number;
}

export const entityRegistry = (hass: HomeAssistant) =>
	hass['entities' as keyof HomeAssistant] as unknown as Record<
		string,
		EntityRegistryDisplayEntry
	>;

export function is_hidden_entity(hass: HomeAssistant, entity_id: string) {
	try {
		return entityRegistry(hass)[entity_id].hidden ?? false;
	} catch {
		return false;
	}
}
