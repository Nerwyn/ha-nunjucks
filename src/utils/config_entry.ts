import { HomeAssistant } from '../models/interfaces/hass';
import {
	ConfigEntry,
	ConfigEntryUpdate,
} from '../models/interfaces/registries';

export async function subscribeConfigEntries(hass: HomeAssistant) {
	await hass.connection.subscribeMessage(
		(updates: ConfigEntryUpdate[]) => {
			const entryId: Record<string, ConfigEntry> =
				window.haNunjucks.configEntries.entryId || {};
			const title2EntryId: Record<string, string[]> =
				window.haNunjucks.configEntries.title2EntryId || {};

			for (const update of updates) {
				if (update.type == 'removed') {
					delete entryId[update.entry.entry_id];

					if (title2EntryId[update.entry.title]) {
						title2EntryId[update.entry.title] = title2EntryId[
							update.entry.title
						].filter((id) => id != update.entry.entry_id);
						if (!title2EntryId[update.entry.title].length) {
							delete title2EntryId[update.entry.title];
						}
					}
				} else {
					if (
						entryId[update.entry.entry_id] &&
						entryId[update.entry.entry_id].title != update.entry.title
					) {
						delete title2EntryId[entryId[update.entry.entry_id].title];
					}

					entryId[update.entry.entry_id] = update.entry;

					title2EntryId[update.entry.title] ??= [];
					if (
						!title2EntryId[update.entry.title].includes(update.entry.entry_id)
					) {
						title2EntryId[update.entry.title].push(update.entry.entry_id);
					}
				}
			}

			window.haNunjucks.configEntries = {
				...window.haNunjucks.configEntries,
				entryId,
				title2EntryId,
			};
		},
		{
			type: 'config_entries/subscribe',
		},
	);
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
