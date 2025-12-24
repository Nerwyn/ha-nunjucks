import { HomeAssistant } from '../models/interfaces/hass';
import { ConfigEntry } from '../models/interfaces/registries';

export async function fetchConfigEntries(hass: HomeAssistant) {
	const entries: ConfigEntry[] = await hass.callWS({
		type: 'config_entries/get',
	});

	for (const entry of entries) {
		window.haNunjucks.configEntries[entry.entry_id] = entry;
	}
}

export function config_entry_id(entity_id: string) {
	return window.haNunjucks.entityRegistry[entity_id]?.config_entry_id;
}

const ConfigEntryAttributes = [
	'domain',
	'title',
	'state',
	'source',
	'disabled_by',
] as const;
type ConfigEntryAttribute = (typeof ConfigEntryAttributes)[number];

export function config_entry_attr(
	config_entry_id: string,
	attr: ConfigEntryAttribute,
) {
	if (!ConfigEntryAttributes.includes(attr)) {
		throw Error('Invalid config entry attribute');
	}
	return window.haNunjucks.configEntries[config_entry_id]?.[attr];
}
