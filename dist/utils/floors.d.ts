import { HomeAssistant } from 'custom-card-helpers';
export declare function floors(hass: HomeAssistant): string[] | undefined;
export declare function floor_id(hass: HomeAssistant, lookup_value: string): string | undefined;
export declare function floor_name(hass: HomeAssistant, lookup_value: string): string | undefined;
export declare function floor_areas(hass: HomeAssistant, floor_name_or_id: string): string[];
