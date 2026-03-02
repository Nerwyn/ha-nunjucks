import { HomeAssistant } from '../models/interfaces/hass';
import { ConfigEntry } from '../models/interfaces/registries';

export async function fetchConfigEntries(hass: HomeAssistant) {
	const entries: ConfigEntry[] = await hass.callWS({
		type: 'config_entries/get',
	});

	const entryId: Record<string, ConfigEntry> = {};
	const title2EntryId: Record<string, string[]> = {};
	for (const entry of entries) {
		entryId[entry.entry_id] = entry;
		title2EntryId[entry.title] ??= [];
		title2EntryId[entry.title].push(entry.entry_id);
	}

	window.haNunjucks.configEntries = { entryId, title2EntryId };
}

export function config_entry_id(entity_id: string) {
	return window.haNunjucks.entityRegistry.entityId2ConfigEntryId[entity_id];
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
	return window.haNunjucks.configEntries.entryId[config_entry_id]?.[attr];
}
