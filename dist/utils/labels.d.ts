import { HomeAssistant } from 'custom-card-helpers';
export declare function labels(hass: HomeAssistant, lookup_value?: string): string | string[];
export declare function label_id(hass: HomeAssistant, lookup_value: string): string | undefined;
export declare function label_name(hass: HomeAssistant, lookup_value: string): string | undefined;
export declare function label_areas(hass: HomeAssistant, label_name_or_id: string): string[];
export declare function label_devices(hass: HomeAssistant, label_name_or_id: string): string[];
export declare function label_entities(hass: HomeAssistant, label_name_or_id: string): string[];
