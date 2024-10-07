import { HomeAssistant } from 'custom-card-helpers';
interface FloorRegistryEntry {
    created_at: number;
    modified_at: number;
    aliases: string[];
    floor_id: string;
    name: string;
    level?: number;
    icon?: string;
}
export declare const floorRegistry: (hass: HomeAssistant) => Record<string, FloorRegistryEntry>;
export declare function floors(hass: HomeAssistant): string[];
export declare function floor_id(hass: HomeAssistant, lookup_value: string): string | null | undefined;
export declare function floor_name(hass: HomeAssistant, lookup_value: string): string | undefined;
export declare function floor_areas(hass: HomeAssistant, floor_name_or_id: string): string[];
export {};
