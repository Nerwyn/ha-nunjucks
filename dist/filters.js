import { HASS } from '.';
import { area_devices, area_entities, area_id, area_name } from './utils/areas';
import { contains } from './utils/contains';
import { device_attr, device_entities, device_id } from './utils/devices';
import { closest } from './utils/distance';
import { floor_areas, floor_id, floor_name } from './utils/floors';
import { expand } from './utils/groups';
import { iif } from './utils/iif';
import { from_json, to_json } from './utils/json';
import { label_areas, label_devices, label_entities, label_id, label_name, labels, } from './utils/labels';
import { str } from './utils/miscellaneous';
import { acos, add, asin, atan, atan2, average, bitwise_and, bitwise_not, bitwise_or, bitwise_xor, bool, cos, is_number, log, max, median, min, multiply, ord, sin, sqrt, statistical_mode, tan, } from './utils/numeric';
import { regex_findall, regex_findall_index, regex_replace, } from './utils/regexp';
import { attr_name_translated, attr_value_translated, state_translated, } from './utils/state_translated';
import { has_value, state_attr, states } from './utils/states';
import { as_datetime, as_local, as_timestamp, time_since, time_until, timestamp_custom, timestamp_local, timestamp_utc, today_at, } from './utils/time';
export function addFilters(env) {
    for (const func in FILTERS) {
        env.addFilter(func, function (...args) {
            return FILTERS[func](...args);
        });
    }
    for (const func in HASS_FILTERS) {
        env.addFilter(func, function (...args) {
            return HASS_FILTERS[func](HASS, ...args);
        });
    }
    return env;
}
const HASS_FILTERS = {
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
    // Floors
    floor_id,
    floor_name,
    floor_areas,
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
const FILTERS = {
    // Labels
    label_id,
    label_name,
    // Time
    today_at,
    as_datetime,
    as_timestamp,
    as_local,
    time_since,
    time_until,
    timestamp_local,
    timestamp_utc,
    timestamp_custom,
    // To/From JSON
    to_json,
    from_json,
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
    bitwise_and,
    bitwise_or,
    bitwise_xor,
    bitwise_not,
    ord,
    multiply,
    add,
    // Regular Expressions
    regex_replace,
    regex_findall,
    regex_findall_index,
    // Miscellaneous
    str,
};
