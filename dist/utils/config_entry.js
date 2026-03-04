export async function fetchConfigEntries(hass) {
    const entries = await hass.callWS({
        type: 'config_entries/get',
    });
    const entryId = {};
    const title2EntryId = {};
    for (const entry of entries) {
        entryId[entry.entry_id] = entry;
        title2EntryId[entry.title] ??= [];
        title2EntryId[entry.title].push(entry.entry_id);
    }
    window.haNunjucks.configEntries = {
        ...window.haNunjucks.configEntries,
        entryId,
        title2EntryId,
    };
}
export function config_entry_id(entity_id) {
    return window.haNunjucks.entityRegistry.entityId2ConfigEntryId[entity_id];
}
const ConfigEntryAttributes = [
    'domain',
    'title',
    'state',
    'source',
    'disabled_by',
];
export function config_entry_attr(config_entry_id, attr) {
    if (!ConfigEntryAttributes.includes(attr)) {
        throw Error('Invalid config entry attribute');
    }
    return window.haNunjucks.configEntries.entryId[config_entry_id]?.[attr];
}
