import { HASS } from '.';
import { area_devices, area_entities, area_id, area_name, areas, } from './utils/areas';
import { device_attr, device_entities, device_id, is_device_attr, } from './utils/devices';
import { closest, distance } from './utils/distance';
import { is_hidden_entity } from './utils/entities';
import { floor_areas, floor_id, floors } from './utils/floors';
import { expand } from './utils/groups';
import { iif } from './utils/iif';
import { integration_entities } from './utils/integrations';
import { label_areas, label_devices, label_entities, labels, } from './utils/labels';
import { match_media, str } from './utils/miscellaneous';
import { acos, asin, atan, atan2, average, bool, cos, e, float, inf, int, is_number, log, max, median, min, pi, sin, sqrt, statistical_mode, tan, tau, } from './utils/numeric';
import { attr_name_translated, attr_value_translated, state_translated, } from './utils/state_translated';
import { has_value, is_state, is_state_attr, state_attr, states, } from './utils/states';
import { as_datetime, as_local, as_timedelta, as_timestamp, get_timedelta, now, strptime, time_since, time_until, today_at, utcnow, } from './utils/time';
import { list, set } from './utils/type_conversions';
import { zip } from './utils/zip';
export function addGlobals(env) {
    for (const func in GLOBALS) {
        env.addGlobal(func, function (...args) {
            return GLOBALS[func](...args);
        });
    }
    for (const func in HASS_GLOBALS) {
        env.addGlobal(func, function (...args) {
            return HASS_GLOBALS[func](HASS, ...args);
        });
    }
    for (const c in CONST_GLOBALS) {
        env.addGlobal(c, CONST_GLOBALS[c]);
    }
    return env;
}
const HASS_GLOBALS = {
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
    // Floors
    floors,
    floor_id,
    floor_areas,
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
const GLOBALS = {
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
    timedelta: get_timedelta,
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
    // Type Conversions
    set,
    list,
    // Iterating Multiple Objects
    zip,
    // Miscellaneous
    match_media,
    str,
};
const CONST_GLOBALS = {
    e,
    pi,
    tau,
    inf,
};
