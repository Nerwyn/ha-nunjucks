import {
	area_devices,
	area_entities,
	area_id,
	area_name,
	areas,
} from './utils/areas';
import { config_entry_attr, config_entry_id } from './utils/config_entry';
import {
	device_attr,
	device_entities,
	device_id,
	device_name,
	is_device_attr,
} from './utils/devices';
import { closest, distance } from './utils/distance';
import { is_hidden_entity } from './utils/entities';
import {
	floor_areas,
	floor_entities,
	floor_id,
	floor_name,
	floors,
} from './utils/floors';
import { expand } from './utils/groups';
import { md5, sha1, sha256, sha512 } from './utils/hashing';
import { iif } from './utils/iif';
import { integration_entities } from './utils/integrations';
import { issue, issues } from './utils/issues';
import {
	label_areas,
	label_description,
	label_devices,
	label_entities,
	label_id,
	label_name,
	labels,
} from './utils/labels';
import { match_media, str } from './utils/miscellaneous';
import {
	acos,
	asin,
	atan,
	atan2,
	average,
	bool,
	clamp,
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
	mod,
	pi,
	remap,
	sin,
	sqrt,
	statistical_mode,
	tan,
	tau,
	wrap,
} from './utils/numeric';
import {
	attr_name_translated,
	attr_value_translated,
	date_translated,
	datetime_translated,
	number_translated,
	state_translated,
	time_translated,
} from './utils/state_translated';
import {
	has_value,
	is_state,
	is_state_attr,
	state_attr,
	states,
} from './utils/states';
import { slugify } from './utils/string_filters';
import { pack, unpack } from './utils/struct';
import {
	as_datetime,
	as_local,
	as_timedelta,
	as_timestamp,
	now,
	relative_time,
	strptime,
	time_since,
	time_until,
	today_at,
	utcnow,
} from './utils/time';
import { list, set } from './utils/type_conversions';
import { zip } from './utils/zip';

import { Environment } from 'nunjucks';
import dt, { date, datetime, time, timedelta } from 'ts-py-datetime';

export function addGlobals(env: Environment) {
	for (const func in GLOBALS) {
		env.addGlobal(func, function (...args: string[]) {
			return GLOBALS[func](...args);
		});
	}

	for (const func in HASS_GLOBALS) {
		env.addGlobal(func, function (...args: string[]) {
			return HASS_GLOBALS[func](window.haNunjucks.hass, ...args);
		});
	}

	for (const c in CONST_GLOBALS) {
		env.addGlobal(c, CONST_GLOBALS[c]);
	}

	env.addGlobal('dt', dt);
	env.addGlobal('date', date);
	env.addGlobal('time', time);
	env.addGlobal('datetime', datetime);
	env.addGlobal('timedelta', timedelta);

	return env;
}

const HASS_GLOBALS: Record<string, CallableFunction> = {
	// States
	states,
	is_state,
	state_attr,
	is_state_attr,
	has_value,

	// State Translated
	state_translated,
	attr_name_translated,
	attr_value_translated,

	// Groups
	expand,

	// Entities
	is_hidden_entity,

	// Devices
	device_entities,
	device_attr,
	is_device_attr,
	device_id,
	device_name,

	// Floors
	floors,
	floor_id,
	floor_name,
	floor_areas,
	floor_entities,

	// Areas
	areas,
	area_id,
	area_name,
	area_entities,
	area_devices,

	// Integrations
	integration_entities,

	// Labels
	labels,
	label_areas,
	label_devices,
	label_entities,

	// Immediate If
	iif,

	// Distance
	distance,
	closest,
};

const GLOBALS: Record<string, CallableFunction> = {
	// Config Entries
	config_entry_id,
	config_entry_attr,

	// Labels
	label_id,
	label_name,
	label_description,

	// Issues
	issues,
	issue,

	// Time
	now,
	utcnow,
	today_at,
	as_datetime,
	as_timestamp,
	as_local,
	strptime,
	relative_time,
	time_since,
	time_until,
	as_timedelta,
	date_translated,
	time_translated,
	datetime_translated,

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
	clamp,
	mod,
	wrap,
	remap,
	number_translated,

	// Type Conversions
	set,
	list,
	str,

	// Iterating Multiple Objects
	zip,

	// Functions and Filters to Process Raw Data
	pack,
	unpack,

	// String filters
	slugify,

	// Hashing
	md5,
	sha1,
	sha256,
	sha512,

	// Miscellaneous
	match_media,
};

const CONST_GLOBALS: Record<string, number> = {
	e,
	pi,
	tau,
	inf,
};
