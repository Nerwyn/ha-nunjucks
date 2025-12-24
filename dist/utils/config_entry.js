export async function fetchConfigEntries(hass) {
    window.haNunjucks.configEntries = await hass.callWS({
        type: 'config_entries/get',
    });
}
export function config_entry_id(entity_id) {
    return window.haNunjucks.entityRegistry.find((entry) => entry.entity_id == entity_id)?.config_entry_id;
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
    return window.haNunjucks.configEntries.find((entry) => entry.entry_id == config_entry_id)?.[attr];
}
