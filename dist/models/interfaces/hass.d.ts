import { Auth, Connection, HassConfig, HassEntities, HassEntity, HassServices, MessageBase } from 'home-assistant-js-websocket';
import { AreaRegistryEntry, DeviceRegistryEntry, EntityRegistryDisplayEntry, FloorRegistryEntry } from './registries';
export interface HomeAssistant {
    auth: Auth;
    connection: Connection;
    connected: boolean;
    states: HassEntities;
    entities: {
        [id: string]: EntityRegistryDisplayEntry;
    };
    devices: {
        [id: string]: DeviceRegistryEntry;
    };
    areas: {
        [id: string]: AreaRegistryEntry;
    };
    floors: {
        [id: string]: FloorRegistryEntry;
    };
    services: HassServices;
    config: HassConfig;
    panelUrl: string;
    language: string;
    selectedLanguage: string | null;
    locale: FrontendLocaleData;
    suspendWhenHidden: boolean;
    enableShortcuts: boolean;
    vibrate: boolean;
    debugConnection: boolean;
    dockedSidebar: 'docked' | 'always_hidden' | 'auto';
    defaultPanel: string;
    moreInfoEntityId: string | null;
    callApi<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, parameters?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
    fetchWithAuth(path: string, init?: Record<string, any>): Promise<Response>;
    sendWS(msg: MessageBase): void;
    callWS<T>(msg: MessageBase): Promise<T>;
    formatEntityState(stateObj: HassEntity, state?: string): string;
    formatEntityAttributeValue(stateObj: HassEntity, attribute: string, value?: any): string;
    formatEntityAttributeName(stateObj: HassEntity, attribute: string): string;
}
export interface HassElement extends HTMLElement {
    hass: HomeAssistant;
}
interface FrontendLocaleData {
    language: string;
    number_format: NumberFormat;
    time_format: TimeFormat;
    date_format: DateFormat;
    first_weekday: FirstWeekday;
    time_zone: TimeZone;
}
export declare enum NumberFormat {
    language = "language",
    system = "system",
    comma_decimal = "comma_decimal",
    decimal_comma = "decimal_comma",
    quote_decimal = "quote_decimal",
    space_comma = "space_comma",
    none = "none"
}
export declare enum TimeFormat {
    language = "language",
    system = "system",
    am_pm = "12",
    twenty_four = "24"
}
export declare enum TimeZone {
    local = "local",
    server = "server"
}
export declare enum DateFormat {
    language = "language",
    system = "system",
    DMY = "DMY",
    MDY = "MDY",
    YMD = "YMD"
}
export declare enum FirstWeekday {
    language = "language",
    monday = "monday",
    tuesday = "tuesday",
    wednesday = "wednesday",
    thursday = "thursday",
    friday = "friday",
    saturday = "saturday",
    sunday = "sunday"
}
export {};
