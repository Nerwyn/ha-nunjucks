import { area_devices, area_entities, area_id, area_name } from './utils/areas';
import { config_entry_attr, config_entry_id } from './utils/config_entry';
import { contains } from './utils/contains';
import {
	device_attr,
	device_entities,
	device_id,
	device_name,
} from './utils/devices';
import { closest } from './utils/distance';
import {
	floor_areas,
	floor_entities,
	floor_id,
	floor_name,
} from './utils/floors';
import { expand } from './utils/groups';
import { md5, sha1, sha256, sha512 } from './utils/hashing';
import { iif } from './utils/iif';
import { from_json, is_defined, to_json } from './utils/json';
import {
	label_areas,
	label_description,
	label_devices,
	label_entities,
	label_id,
	label_name,
	labels,
} from './utils/labels';
import { str } from './utils/miscellaneous';
import {
	acos,
	add,
	asin,
	atan,
	atan2,
	average,
	bitwise_and,
	bitwise_not,
	bitwise_or,
	bitwise_xor,
	bool,
	clamp,
	cos,
	is_number,
	log,
	max,
	median,
	min,
	mod,
	multiply,
	ord,
	remap,
	sin,
	sqrt,
	statistical_mode,
	tan,
	wrap,
} from './utils/numeric';
import {
	regex_findall,
	regex_findall_index,
	regex_replace,
} from './utils/regexp';
import { shuffle } from './utils/shuffling';
import {
	attr_name_translated,
	attr_value_translated,
	date_translated,
	datetime_translated,
	number_translated,
	state_translated,
	time_translated,
} from './utils/state_translated';
import { has_value, state_attr, states } from './utils/states';
import {
	base64_decode,
	base64_encode,
	ordinal,
	slugify,
} from './utils/string_filters';
import { pack, unpack } from './utils/struct';
import {
	as_datetime,
	as_local,
	as_timedelta,
	as_timestamp,
	relative_time,
	time_since,
	time_until,
	timestamp_custom,
	timestamp_local,
	timestamp_utc,
	today_at,
} from './utils/time';

import { Environment } from 'nunjucks';

export function addFilters(env: Environment) {
	for (const func in FILTERS) {
		env.addFilter(func, function (...args) {
			return FILTERS[func](...args);
		});
	}

	for (const func in HASS_FILTERS) {
		env.addFilter(func, function (...args) {
			return HASS_FILTERS[func](window.haNunjucks.hass, ...args);
		});
	}

	return env;
}

const HASS_FILTERS: Record<string, CallableFunction> = {
	// States
	states,
	state_attr,
	has_value,

	// State Translated
	state_translated,
	attr_name_translated,
	attr_value_translated,

	// Groups
	expand,

	// Devices
	device_entities,
	device_attr,
	device_id,
	device_name,

	// Floors
	floor_id,
	floor_name,
	floor_areas,
	floor_entities,

	// Areas
	area_id,
	area_name,
	area_entities,
	area_devices,

	// Labels
	labels,
	label_areas,
	label_devices,
	label_entities,

	// IIF
	iif,

	// Distance
	closest,
};

const FILTERS: Record<string, CallableFunction> = {
	// Config Entries
	config_entry_id,
	config_entry_attr,

	// Labels
	label_id,
	label_name,
	label_description,

	// Time
	today_at,
	as_timedelta,
	as_datetime,
	as_timestamp,
	as_local,
	relative_time,
	time_since,
	time_until,
	timestamp_local,
	timestamp_utc,
	timestamp_custom,
	date_translated,
	time_translated,
	datetime_translated,

	// To/From JSON
	to_json,
	from_json,

	// Is Defined
	is_defined,

	// Distance
	closest,

	// Contains
	contains,

	// Numeric
	// float filter is built into nunjucks
	is_number,
	// int filter is built into nunjucks
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
	bitwise_and,
	bitwise_or,
	bitwise_xor,
	bitwise_not,
	ord,
	multiply,
	add,
	number_translated,

	// Type conversions
	str,

	// Functions and Filters to Process Raw Data
	pack,
	unpack,

	// String filters
	// urlencode filter is built into nunjucks
	slugify,
	ordinal,
	base64_encode,
	base64_decode,

	// Hashing
	md5,
	sha1,
	sha256,
	sha512,

	// Shuffling
	shuffle,

	// Regular Expressions
	regex_replace,
	regex_findall,
	regex_findall_index,
};
