import { HomeAssistant } from '../models/interfaces/hass';
export declare function fetchLabelRegistry(hass: HomeAssistant): Promise<void>;
export declare function labels(hass: HomeAssistant, lookup_value?: string): string[];
export declare function label_id(lookup_value: string): string | undefined;
export declare function label_name(lookup_value: string): string;
export declare function label_areas(hass: HomeAssistant, label_name_or_id: string): string[];
export declare function label_devices(hass: HomeAssistant, label_name_or_id: string): string[];
export declare function label_entities(hass: HomeAssistant, label_name_or_id: string): string[];
