export async function fetchConfigEntries(hass) {
    const entries = await hass.connection.sendMessagePromise({
        type: 'config_entries/list',
    });
    entries.sort((ent1, ent2) => ent1.entry_id.localeCompare(ent2.entry_id));
    for (const entry of entries) {
        window.haNunjucks.configEntries[entry.entry_id] = entry;
    }
}
export function config_entry_id(entity_id) {
    return window.haNunjucks.entityRegistry[entity_id]?.config_entry_id;
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
    return window.haNunjucks.configEntries[config_entry_id]?.[attr];
}
