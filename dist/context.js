import { area_devices, area_entities, area_id, area_name, areas, } from './utils/areas';
import { match_media } from './utils/css';
import { device_attr, device_entities, device_id, is_device_attr, } from './utils/devices';
import { is_hidden_entity } from './utils/entities';
import { floor_areas, floor_id, floor_name, floors } from './utils/floors';
import { iif } from './utils/iif';
import { integration_entities } from './utils/integrations';
import { has_value, is_state, is_state_attr, state_attr, states, } from './utils/states';
export const CONTEXT = (hass) => ({
    True: true,
    False: false,
    None: null,
    hass: hass,
    states(entity_id, rounded, with_unit) {
        return states(hass, entity_id, rounded, with_unit);
    },
    is_state(entity_id, value) {
        return is_state(hass, entity_id, value);
    },
    state_attr(entity_id, attribute) {
        return state_attr(hass, entity_id, attribute);
    },
    is_state_attr(entity_id, attribute, value) {
        return is_state_attr(hass, entity_id, attribute, value);
    },
    has_value(entity_id) {
        return has_value(hass, entity_id);
    },
    is_hidden_entity(entity_id) {
        return is_hidden_entity(hass, entity_id);
    },
    device_entities(device_id) {
        return device_entities(hass, device_id);
    },
    device_attr(device_or_entity_id, attr_name) {
        return device_attr(hass, device_or_entity_id, attr_name);
    },
    is_device_attr(device_or_entity_id, attr_name, attr_value) {
        return is_device_attr(hass, device_or_entity_id, attr_name, attr_value);
    },
    device_id(entity_id) {
        return device_id(hass, entity_id);
    },
    floors() {
        return floors(hass);
    },
    floor_id(lookup_value) {
        return floor_id(hass, lookup_value);
    },
    floor_name(lookup_value) {
        return floor_name(hass, lookup_value);
    },
    floor_areas(floor_name_or_id) {
        return floor_areas(hass, floor_name_or_id);
    },
    areas() {
        return areas(hass);
    },
    area_id(lookup_value) {
        return area_id(hass, lookup_value);
    },
    area_name(lookup_value) {
        return area_name(hass, lookup_value);
    },
    area_entities(area_name_or_id) {
        return area_entities(hass, area_name_or_id);
    },
    area_devices(area_name_or_id) {
        return area_devices(hass, area_name_or_id);
    },
    integration_entities(integration) {
        return integration_entities(hass, integration);
    },
    iif(condition, if_true, if_false, if_none) {
        return iif(hass, condition, if_true, if_false, if_none);
    },
    match_media(mediaquery) {
        return match_media(mediaquery);
    },
});
