import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant } from '../models/hass';
export declare function states(hass: HomeAssistant, entity_id: string, rounded?: boolean | Record<string, boolean>, with_unit?: boolean): string | undefined;
export declare function is_state(hass: HomeAssistant, entity_id: string, value: string | string[]): boolean;
export declare function state_attr(hass: HomeAssistant, entity_id: string, attribute: string): any;
export declare function is_state_attr(hass: HomeAssistant, entity_id: string, attribute: string, value: string): boolean;
export declare function has_value(hass: HomeAssistant, entity_id: string): boolean;
export declare function buildStatesObject(hass: HomeAssistant): Record<string, Record<string, HassEntity>>;
