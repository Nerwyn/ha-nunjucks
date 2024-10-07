import { HomeAssistant } from 'custom-card-helpers';
export interface AreaRegistryEntry {
    created_at: number;
    modified_at: number;
    area_id: string;
    floor_id: string | null;
    name: string;
    picture: string | null;
    icon: string | null;
    labels: string[];
    aliases: string[];
}
export declare const areaRegistry: (hass: HomeAssistant) => Record<string, AreaRegistryEntry>;
export declare function areas(hass: HomeAssistant): string[];
export declare function area_id(hass: HomeAssistant, lookup_value: string): string | null | undefined;
export declare function area_name(hass: HomeAssistant, lookup_value: string): string | undefined;
export declare function area_entities(hass: HomeAssistant, area_name_or_id: string): string[];
export declare function area_devices(hass: HomeAssistant, area_name_or_id: string): string[];
