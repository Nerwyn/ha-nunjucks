import { HomeAssistant } from '../models/interfaces/hass';
export declare function state_translated(hass: HomeAssistant, entity_id: string, state?: string): string;
export declare function attr_name_translated(hass: HomeAssistant, entity_id: string, attr_name: string): string;
export declare function attr_value_translated(hass: HomeAssistant, entity_id: string, attr_name: string, attr_value?: string): any;
