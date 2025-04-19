import { HomeAssistant } from '../models/interfaces/hass';
export declare function floors(hass: HomeAssistant): string[];
export declare function floor_id(hass: HomeAssistant, lookup_value: string): string | null | undefined;
export declare function floor_name(hass: HomeAssistant, lookup_value: string): string | undefined;
export declare function floor_areas(hass: HomeAssistant, floor_name_or_id: string): string[];
