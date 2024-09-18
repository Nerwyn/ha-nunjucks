import { HomeAssistant } from 'custom-card-helpers';

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
	acos,
	asin,
	atan,
	atan2,
	average,
	bool,
	cos,
	e,
	float,
	inf,
	int,
	is_number,
	log,
	max,
	median,
	min,
	pi,
	sin,
	sqrt,
	statistical_mode,
	tan,
	tau,
} from './utils/numeric';
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
	as_timedelta,
	as_timestamp,
	now,
	strptime,
	time_since,
	time_until,
	timedelta,
	today_at,
	utcnow,
} from './utils/time';

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
	? (...args: P) => R
	: never;
type ParametersOmitFirstArg<F> = Parameters<OmitFirstArg<F>>;

export const CONTEXT = (hass: HomeAssistant) => ({
	True: true,
	False: false,
	None: null,
	hass: hass,

	// States
	states: (...args: ParametersOmitFirstArg<typeof states>) =>
		states(hass, ...args),
	is_state: (...args: ParametersOmitFirstArg<typeof is_state>) =>
		is_state(hass, ...args),
	state_attr: (...args: ParametersOmitFirstArg<typeof state_attr>) =>
		state_attr(hass, ...args),
	is_state_attr: (...args: ParametersOmitFirstArg<typeof is_state_attr>) =>
		is_state_attr(hass, ...args),
	has_value: (...args: ParametersOmitFirstArg<typeof has_value>) =>
		has_value(hass, ...args),
	state_translated: (
		...args: ParametersOmitFirstArg<typeof state_translated>
	) => state_translated(hass, ...args),
	attr_name_translated: (
		...args: ParametersOmitFirstArg<typeof attr_name_translated>
	) => attr_name_translated(hass, ...args),
	attr_value_translated: (
		...args: ParametersOmitFirstArg<typeof attr_value_translated>
	) => attr_value_translated(hass, ...args),

	// Entities
	is_hidden_entity: (
		...args: ParametersOmitFirstArg<typeof is_hidden_entity>
	) => is_hidden_entity(hass, ...args),

	// Devices
	device_entities: (
		...args: ParametersOmitFirstArg<typeof device_entities>
	) => device_entities(hass, ...args),
	device_attr: (...args: ParametersOmitFirstArg<typeof device_attr>) =>
		device_attr(hass, ...args),
	is_device_attr: (...args: ParametersOmitFirstArg<typeof is_device_attr>) =>
		is_device_attr(hass, ...args),
	device_id: (...args: ParametersOmitFirstArg<typeof device_id>) =>
		device_id(hass, ...args),

	// Floors
	floors: (...args: ParametersOmitFirstArg<typeof floors>) =>
		floors(hass, ...args),
	floor_id: (...args: ParametersOmitFirstArg<typeof floor_id>) =>
		floor_id(hass, ...args),
	floor_areas: (...args: ParametersOmitFirstArg<typeof floor_areas>) =>
		floor_areas(hass, ...args),

	// Areas
	areas: (...args: ParametersOmitFirstArg<typeof areas>) =>
		areas(hass, ...args),
	area_id: (...args: ParametersOmitFirstArg<typeof area_id>) =>
		area_id(hass, ...args),
	area_name: (...args: ParametersOmitFirstArg<typeof area_name>) =>
		area_name(hass, ...args),
	area_entities: (...args: ParametersOmitFirstArg<typeof area_entities>) =>
		area_entities(hass, ...args),
	area_devices: (...args: ParametersOmitFirstArg<typeof area_devices>) =>
		area_devices(hass, ...args),

	// Integrations
	integration_entities: (
		...args: ParametersOmitFirstArg<typeof integration_entities>
	) => integration_entities(hass, ...args),

	// Labels
	labels: (...args: ParametersOmitFirstArg<typeof labels>) =>
		labels(hass, ...args),
	label_areas: (...args: ParametersOmitFirstArg<typeof label_areas>) =>
		label_areas(hass, ...args),
	label_devices: (...args: ParametersOmitFirstArg<typeof label_devices>) =>
		label_devices(hass, ...args),
	label_entities: (...args: ParametersOmitFirstArg<typeof label_entities>) =>
		label_entities(hass, ...args),

	// Immediate If
	iif: (...args: ParametersOmitFirstArg<typeof iif>) => iif(hass, ...args),

	// Time
	now,
	utcnow,
	today_at,
	as_datetime,
	as_timestamp,
	as_local,
	strptime,
	time_since,
	time_until,
	timedelta,
	as_timedelta,

	// Numeric,
	float,
	is_number,
	int,
	bool,
	log,
	sin,
	cos,
	tan,
	asin,
	acos,
	atan,
	atan2,
	sqrt,
	max,
	min,
	average,
	median,
	statistical_mode,
	e,
	pi,
	tau,
	inf,

	// CSS
	match_media,
});
