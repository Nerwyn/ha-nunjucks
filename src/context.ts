import { HomeAssistant } from 'custom-card-helpers';
import { PyDate, PyDatetime } from 'py-datetime';

import {
	area_devices,
	area_entities,
	area_id,
	area_name,
	areas,
} from './utils/areas';
import { match_media } from './utils/css';
import {
	device_attr,
	device_entities,
	device_id,
	is_device_attr,
} from './utils/devices';
import { is_hidden_entity } from './utils/entities';
import { floor_areas, floor_id, floors } from './utils/floors';
import { iif } from './utils/iif';
import { integration_entities } from './utils/integrations';
import {
	label_areas,
	label_devices,
	label_entities,
	labels,
} from './utils/labels';
import {
	attr_name_translated,
	attr_value_translated,
	has_value,
	is_state,
	is_state_attr,
	state_attr,
	state_translated,
	states,
} from './utils/states';
import {
	as_datetime,
	as_local,
	as_timestamp,
	now,
	strptime,
	timedelta,
	today_at,
	utcnow,
} from './utils/time';

export const CONTEXT = (hass: HomeAssistant) => ({
	True: true,
	False: false,
	None: null,
	hass: hass,

	// States
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
	state_translated(entity_id: string, state?: string) {
		return state_translated(hass, entity_id, state);
	},
	attr_name_translated(
		entity_id: string,
		attr_name: string,
		attr_value?: string,
	) {
		return attr_name_translated(hass, entity_id, attr_name, attr_value);
	},
	attr_value_translated(
		entity_id: string,
		attr_name: string,
		attr_value?: string,
	) {
		return attr_value_translated(hass, entity_id, attr_name, attr_value);
	},

	// Entities
	is_hidden_entity(entity_id: string) {
		return is_hidden_entity(hass, entity_id);
	},

	// Devices
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
		return is_device_attr(hass, device_or_entity_id, attr_name, attr_value);
	},
	device_id(entity_id: string) {
		return device_id(hass, entity_id);
	},

	// Floors
	floors() {
		return floors(hass);
	},
	floor_id(lookup_value: string) {
		return floor_id(hass, lookup_value);
	},
	floor_areas(floor_id: string) {
		return floor_areas(hass, floor_id);
	},

	// Areas
	areas() {
		return areas(hass);
	},
	area_id(lookup_value: string) {
		return area_id(hass, lookup_value);
	},
	area_name(lookup_value: string) {
		return area_name(hass, lookup_value);
	},
	area_entities(area_name_or_id: string) {
		return area_entities(hass, area_name_or_id);
	},
	area_devices(area_name_or_id: string) {
		return area_devices(hass, area_name_or_id);
	},

	// Integrations
	integration_entities(integration: string) {
		return integration_entities(hass, integration);
	},

	// Labels
	labels(lookup_value?: string) {
		return labels(hass, lookup_value);
	},
	label_areas(label_name_or_id: string) {
		return label_areas(hass, label_name_or_id);
	},
	label_devices(label_name_or_id: string) {
		return label_devices(hass, label_name_or_id);
	},
	label_entities(label_name_or_id: string) {
		return label_entities(hass, label_name_or_id);
	},

	// Immediate If
	iif(
		condition: string,
		if_true: string,
		if_false?: string,
		if_none?: string,
	) {
		return iif(hass, condition, if_true, if_false, if_none);
	},

	// Time
	now() {
		return now();
	},
	utcnow() {
		return utcnow();
	},
	today_at(value: string) {
		return today_at(value);
	},
	as_datetime(value: number | string | PyDate, fallback?: string) {
		return as_datetime(value, fallback);
	},
	as_timestamp(value: string, fallback?: string) {
		return as_timestamp(value, fallback);
	},
	as_local(value: PyDatetime) {
		return as_local(value);
	},
	strptime(value: string, format: string, fallback?: string) {
		return strptime(value, format, fallback);
	},
	timedelta(
		days?: number,
		seconds?: number,
		microseconds?: number,
		milliseconds?: number,
		minutes?: number,
		hours?: number,
		weeks?: number,
	) {
		return timedelta(
			days,
			seconds,
			microseconds,
			milliseconds,
			minutes,
			hours,
			weeks,
		);
	},

	// CSS
	match_media(mediaquery: string) {
		return match_media(mediaquery);
	},
});
