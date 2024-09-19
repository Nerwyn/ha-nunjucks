import { area_devices, area_entities, area_id, area_name, areas, } from './utils/areas';
import { match_media } from './utils/css';
import { device_attr, device_entities, device_id, is_device_attr, } from './utils/devices';
import { closest, distance } from './utils/distance';
import { is_hidden_entity } from './utils/entities';
import { floor_areas, floor_id, floors } from './utils/floors';
import { iif } from './utils/iif';
import { integration_entities } from './utils/integrations';
import { label_areas, label_devices, label_entities, labels, } from './utils/labels';
import { acos, asin, atan, atan2, average, bool, cos, e, float, inf, int, is_number, log, max, median, min, pi, sin, sqrt, statistical_mode, tan, tau, } from './utils/numeric';
import { attr_name_translated, attr_value_translated, has_value, is_state, is_state_attr, state_attr, state_translated, states, } from './utils/states';
import { as_datetime, as_local, as_timedelta, as_timestamp, now, strptime, time_since, time_until, timedelta, today_at, utcnow, } from './utils/time';
export const CONTEXT = (hass) => ({
    True: true,
    False: false,
    None: null,
    hass: hass,
    // States
    states: (...args) => states(hass, ...args),
    is_state: (...args) => is_state(hass, ...args),
    state_attr: (...args) => state_attr(hass, ...args),
    is_state_attr: (...args) => is_state_attr(hass, ...args),
    has_value: (...args) => has_value(hass, ...args),
    state_translated: (...args) => state_translated(hass, ...args),
    attr_name_translated: (...args) => attr_name_translated(hass, ...args),
    attr_value_translated: (...args) => attr_value_translated(hass, ...args),
    // Entities
    is_hidden_entity: (...args) => is_hidden_entity(hass, ...args),
    // Devices
    device_entities: (...args) => device_entities(hass, ...args),
    device_attr: (...args) => device_attr(hass, ...args),
    is_device_attr: (...args) => is_device_attr(hass, ...args),
    device_id: (...args) => device_id(hass, ...args),
    // Floors
    floors: (...args) => floors(hass, ...args),
    floor_id: (...args) => floor_id(hass, ...args),
    floor_areas: (...args) => floor_areas(hass, ...args),
    // Areas
    areas: (...args) => areas(hass, ...args),
    area_id: (...args) => area_id(hass, ...args),
    area_name: (...args) => area_name(hass, ...args),
    area_entities: (...args) => area_entities(hass, ...args),
    area_devices: (...args) => area_devices(hass, ...args),
    // Integrations
    integration_entities: (...args) => integration_entities(hass, ...args),
    // Labels
    labels: (...args) => labels(hass, ...args),
    label_areas: (...args) => label_areas(hass, ...args),
    label_devices: (...args) => label_devices(hass, ...args),
    label_entities: (...args) => label_entities(hass, ...args),
    // Immediate If
    iif: (...args) => iif(hass, ...args),
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
    // Distance
    distance: (...args) => distance(hass, ...args),
    closest: (...args) => closest(hass, ...args),
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
