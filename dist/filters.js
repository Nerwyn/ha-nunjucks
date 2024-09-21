import { area_devices, area_entities, area_id, area_name } from './utils/areas';
import { contains } from './utils/contains';
import { device_attr, device_entities, device_id } from './utils/devices';
import { closest } from './utils/distance';
import { floor_areas } from './utils/floors';
import { expand } from './utils/groups';
import { iif } from './utils/iif';
import { from_json, to_json } from './utils/json';
import { label_areas, label_devices, label_entities } from './utils/labels';
import { acos, add, asin, atan, atan2, average, bitwise_and, bitwise_or, bitwise_xor, bool, cos, float, int, is_number, log, max, median, min, multiply, ord, round, sin, sqrt, statistical_mode, tan, } from './utils/numeric';
import { regex_findall, regex_findall_index, regex_replace, } from './utils/regexp';
import { has_value } from './utils/states';
import { base64_decode, ordinal, slugify, urlencode } from './utils/string';
import { as_datetime, as_local, as_timestamp, time_since, time_until, timestamp_custom, timestamp_local, timestamp_utc, } from './utils/time';
import { Template } from 'nunjucks';
export function addFilters(env) {
    for (const func in FILTERS) {
        env.addFilter(func, function (...args) {
            return FILTERS[func](...args);
        });
    }
    for (const func in HASS_FILTERS) {
        env.addFilter(func, function (...args) {
            const hass = JSON.parse(new Template('{{ hass | dump | safe }}').render(
            // @ts-ignore
            this.getVariables()));
            return HASS_FILTERS[func](hass, ...args);
        });
    }
    return env;
}
const HASS_FILTERS = {
    // States
    has_value,
    // Groups
    expand,
    // Devices
    device_entities,
    device_attr,
    device_id,
    // Floors
    floor_areas,
    // Areas
    area_id,
    area_name,
    area_entities,
    area_devices,
    // Labels
    label_areas,
    label_devices,
    label_entities,
    // IIF
    iif,
    // Distance
    closest,
};
const FILTERS = {
    // Time
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
    // Contains
    contains,
    // Numeric
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
    round,
    bitwise_and,
    bitwise_or,
    bitwise_xor,
    ord,
    multiply,
    add,
    // String
    urlencode,
    slugify,
    ordinal,
    base64_decode,
    // Regular Expressions
    regex_replace,
    regex_findall,
    regex_findall_index,
};
