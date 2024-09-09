import { HomeAssistant } from 'custom-card-helpers';
export declare function areas(hass: HomeAssistant): string[];
export declare function area_id(hass: HomeAssistant, lookup_value: string): string | undefined;
export declare function area_name(hass: HomeAssistant, lookup_value: string): string | undefined;
export declare function area_entities(hass: HomeAssistant, area_name_or_id: string): string[];
export declare function area_devices(hass: HomeAssistant, area_name_or_id: string): string[];
