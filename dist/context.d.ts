import { HomeAssistant } from 'custom-card-helpers';
import { PyDate, PyDatetime } from 'py-datetime';
export declare const CONTEXT: (hass: HomeAssistant) => {
    True: boolean;
    False: boolean;
    None: null;
    hass: HomeAssistant;
    states(entity_id: string, rounded?: boolean, with_unit?: boolean): string | undefined;
    is_state(entity_id: string, value: string): boolean;
    state_attr(entity_id: string, attribute: string): any;
    is_state_attr(entity_id: string, attribute: string, value: string): boolean;
    has_value(entity_id: string): boolean;
    state_translated(entity_id: string, state?: string): string;
    attr_name_translated(entity_id: string, attr_name: string, attr_value?: string): string;
    attr_value_translated(entity_id: string, attr_name: string, attr_value?: string): any;
    is_hidden_entity(entity_id: string): string | false;
    device_entities(device_id: string): string[];
    device_attr(device_or_entity_id: string, attr_name: string): string | undefined;
    is_device_attr(device_or_entity_id: string, attr_name: string, attr_value: string): boolean;
    device_id(entity_id: string): string | undefined;
    floors(): string[] | undefined;
    floor_id(lookup_value: string): string | undefined;
    floor_areas(floor_id: string): string[];
    areas(): string[];
    area_id(lookup_value: string): string | undefined;
    area_name(lookup_value: string): string | undefined;
    area_entities(area_name_or_id: string): string[];
    area_devices(area_name_or_id: string): string[];
    integration_entities(integration: string): string[];
    labels(lookup_value?: string): string | string[];
    label_areas(label_name_or_id: string): string[];
    label_devices(label_name_or_id: string): string[];
    label_entities(label_name_or_id: string): string[];
    iif(condition: string, if_true: string, if_false?: string, if_none?: string): string | boolean;
    now(): PyDatetime;
    utcnow(): PyDatetime;
    today_at(value: string): PyDatetime;
    as_datetime(value: number | string | PyDate, fallback?: string): string | PyDatetime;
    as_timestamp(value: string, fallback?: string): string | number;
    as_local(value: PyDatetime): PyDatetime;
    strptime(value: string, format: string, fallback?: string): string | PyDatetime;
    timedelta(days?: number, seconds?: number, microseconds?: number, milliseconds?: number, minutes?: number, hours?: number, weeks?: number): import("py-datetime").PyTimedelta;
    match_media(mediaquery: string): boolean;
};
