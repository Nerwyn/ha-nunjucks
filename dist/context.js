import { states, is_state, state_attr, is_state_attr, has_value, } from './utils/states';
import { iif } from './utils/iif';
import { match_media } from './utils/css';
export const CONTEXT = (hass) => ({
    True: true,
    False: false,
    None: null,
    hass: hass,
    states(entity_id) {
        return states(hass, entity_id);
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
    iif(condition, if_true, if_false, if_none) {
        return iif(hass, condition, if_true, if_false, if_none);
    },
    match_media(mediaquery) {
        return match_media(mediaquery);
    },
});
