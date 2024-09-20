import { HomeAssistant } from 'custom-card-helpers';
import { match_media } from './utils/css';
import { closest, distance } from './utils/distance';
import { expand } from './utils/groups';
import { from_json, str, to_json } from './utils/json';
import { acos, asin, atan, atan2, average, bool, cos, float, int, is_number, log, max, median, min, sin, sqrt, statistical_mode, tan } from './utils/numeric';
import { as_datetime, as_local, as_timedelta, as_timestamp, now, strptime, time_since, time_until, timedelta, today_at, utcnow } from './utils/time';
type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
type ParametersOmitFirstArg<F> = Parameters<OmitFirstArg<F>>;
export declare const CONTEXT: (hass: HomeAssistant) => {
    True: boolean;
    False: boolean;
    None: null;
    hass: HomeAssistant;
    states: (entity_id: string, rounded?: boolean | undefined, with_unit?: boolean | undefined) => string | undefined;
    is_state: (entity_id: string, value: string | string[]) => boolean;
    state_attr: (entity_id: string, attribute: string) => any;
    is_state_attr: (entity_id: string, attribute: string, value: string | string[]) => boolean;
    has_value: (entity_id: string) => boolean;
    state_translated: (entity_id: string, state?: string | undefined) => string;
    attr_name_translated: (entity_id: string, attr_name: string, attr_value?: string | undefined) => string;
    attr_value_translated: (entity_id: string, attr_name: string, attr_value?: string | undefined) => any;
    expand: (...args: ParametersOmitFirstArg<typeof expand>) => import("home-assistant-js-websocket").HassEntity[];
    is_hidden_entity: (entity_id: string) => string | false;
    device_entities: (device_id: string) => string[];
    device_attr: (device_or_entity_id: string, attr_name: string) => string | undefined;
    is_device_attr: (device_or_entity_id: string, attr_name: string, attr_value: string) => boolean;
    device_id: (entity_id: string) => string | undefined;
    floors: () => string[] | undefined;
    floor_id: (lookup_value: string) => string | undefined;
    floor_areas: (floor_id: string) => string[];
    areas: () => string[];
    area_id: (lookup_value: string) => string | undefined;
    area_name: (lookup_value: string) => string | undefined;
    area_entities: (area_name_or_id: string) => string[];
    area_devices: (area_name_or_id: string) => string[];
    integration_entities: (integration: string) => string[];
    labels: (lookup_value?: string | undefined) => string | string[];
    label_areas: (label_id: string) => string[];
    label_devices: (label_id: string) => string[];
    label_entities: (label_id: string) => string[];
    iif: (condition: string, if_true?: string | undefined, if_false?: string | undefined, if_none?: string | undefined) => string | boolean;
    now: typeof now;
    utcnow: typeof utcnow;
    today_at: typeof today_at;
    as_datetime: typeof as_datetime;
    as_timestamp: typeof as_timestamp;
    as_local: typeof as_local;
    strptime: typeof strptime;
    time_since: typeof time_since;
    time_until: typeof time_until;
    timedelta: typeof timedelta;
    as_timedelta: typeof as_timedelta;
    to_json: typeof to_json;
    from_json: typeof from_json;
    str: typeof str;
    distance: (...args: ParametersOmitFirstArg<typeof distance>) => number | null | undefined;
    closest: (...args: ParametersOmitFirstArg<typeof closest>) => import("home-assistant-js-websocket").HassEntity | null;
    float: typeof float;
    is_number: typeof is_number;
    int: typeof int;
    bool: typeof bool;
    log: typeof log;
    sin: typeof sin;
    cos: typeof cos;
    tan: typeof tan;
    asin: typeof asin;
    acos: typeof acos;
    atan: typeof atan;
    atan2: typeof atan2;
    sqrt: typeof sqrt;
    max: typeof max;
    min: typeof min;
    average: typeof average;
    median: typeof median;
    statistical_mode: typeof statistical_mode;
    e: number;
    pi: number;
    tau: number;
    inf: number;
    match_media: typeof match_media;
};
export {};
