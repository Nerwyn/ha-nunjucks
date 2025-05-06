import { HomeAssistant } from '../models/interfaces/hass';
export declare function buildStatesObject(): void;
export declare function states(hass: HomeAssistant, entity_id: string, rounded?: boolean | Record<string, boolean>, with_unit?: boolean): string | undefined;
export declare function is_state(hass: HomeAssistant, entity_id: string, value: string | string[]): boolean;
export declare function state_attr(hass: HomeAssistant, entity_id: string, attribute: string): any;
export declare function is_state_attr(hass: HomeAssistant, entity_id: string, attribute: string, value: string): boolean;
export declare function has_value(hass: HomeAssistant, entity_id: string): boolean;
