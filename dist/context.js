import { match_media } from './utils/css';
import { device_attr, device_entities, device_id, is_device_attr, } from './utils/devices';
import { is_hidden_entity } from './utils/entities';
import { iif } from './utils/iif';
import { has_value, is_state, is_state_attr, state_attr, states, } from './utils/states';
export const CONTEXT = (hass) => {
    for (const entityId in hass.states) {
        const [domain, entity] = entityId.split('.');
        hass.states[domain] = hass.states[domain] ?? {};
        hass.states[domain][entity] =
            hass.states[entityId];
    }
    return {
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
        iif(condition, if_true, if_false, if_none) {
            return iif(hass, condition, if_true, if_false, if_none);
        },
        match_media(mediaquery) {
            return match_media(mediaquery);
        },
    };
};
