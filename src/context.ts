import { HomeAssistant } from 'custom-card-helpers';
import { HassEntities } from 'home-assistant-js-websocket';

import { match_media } from './utils/css';
import {
	device_attr,
	device_entities,
	device_id,
	is_device_attr,
} from './utils/devices';
import { is_hidden_entity } from './utils/entities';
import { iif } from './utils/iif';
import {
	has_value,
	is_state,
	is_state_attr,
	state_attr,
	states,
} from './utils/states';

export const CONTEXT = (hass: HomeAssistant) => {
	for (const entityId in hass.states) {
		const [domain, entity] = entityId.split('.');
		hass.states[domain] = hass.states[domain] ?? {};
		(hass.states[domain] as unknown as HassEntities)[entity] =
			hass.states[entityId];
	}
	return {
		True: true,
		False: false,
		None: null,
		hass: hass,
		states(entity_id: string, rounded?: boolean, with_unit?: boolean) {
			return states(hass, entity_id, rounded, with_unit);
		},
		is_state(entity_id: string, value: string) {
			return is_state(hass, entity_id, value);
		},
		state_attr(entity_id: string, attribute: string) {
			return state_attr(hass, entity_id, attribute);
		},
		is_state_attr(entity_id: string, attribute: string, value: string) {
			return is_state_attr(hass, entity_id, attribute, value);
		},
		has_value(entity_id: string) {
			return has_value(hass, entity_id);
		},
		is_hidden_entity(entity_id: string) {
			return is_hidden_entity(hass, entity_id);
		},
		device_entities(device_id: string) {
			return device_entities(hass, device_id);
		},
		device_attr(device_or_entity_id: string, attr_name: string) {
			return device_attr(hass, device_or_entity_id, attr_name);
		},
		is_device_attr(
			device_or_entity_id: string,
			attr_name: string,
			attr_value: string,
		) {
			return is_device_attr(
				hass,
				device_or_entity_id,
				attr_name,
				attr_value,
			);
		},
		device_id(entity_id: string) {
			return device_id(hass, entity_id);
		},
		iif(
			condition: string,
			if_true: string,
			if_false?: string,
			if_none?: string,
		) {
			return iif(hass, condition, if_true, if_false, if_none);
		},
		match_media(mediaquery: string) {
			return match_media(mediaquery);
		},
	};
};
