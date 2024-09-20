import { HomeAssistant } from 'custom-card-helpers';
export declare function states(hass: HomeAssistant, entity_id: string, rounded?: boolean | Record<string, boolean>, with_unit?: boolean): string | undefined;
export declare function is_state(hass: HomeAssistant, entity_id: string, value: string | string[]): boolean;
export declare function state_attr(hass: HomeAssistant, entity_id: string, attribute: string): any;
export declare function is_state_attr(hass: HomeAssistant, entity_id: string, attribute: string, value: string | string[]): boolean;
export declare function has_value(hass: HomeAssistant, entity_id: string): boolean;
export declare function state_translated(hass: HomeAssistant, entity_id: string, state?: string): string;
export declare function attr_name_translated(hass: HomeAssistant, entity_id: string, attr_name: string, attr_value?: string): string;
export declare function attr_value_translated(hass: HomeAssistant, entity_id: string, attr_name: string, attr_value?: string): any;
