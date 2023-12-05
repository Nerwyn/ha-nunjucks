import { HomeAssistant } from 'custom-card-helpers';
export declare function _states(hass: HomeAssistant, entity_id: string): string;
export declare function _is_state(hass: HomeAssistant, entity_id: string, value: string | string[]): boolean;
export declare function _state_attr(hass: HomeAssistant, entity_id: string, attribute: string): any;
export declare function _is_state_attr(hass: HomeAssistant, entity_id: string, attribute: string, value: string | string[]): boolean;
export declare function _has_value(hass: HomeAssistant, entity_id: string): boolean;
