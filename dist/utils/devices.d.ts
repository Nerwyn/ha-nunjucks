import { HomeAssistant } from 'custom-card-helpers';
export declare function device_entities(hass: HomeAssistant, device_id: string): string[];
export declare function device_attr(hass: HomeAssistant, device_or_entity_id: string, attr_name: string): string | undefined;
export declare function is_device_attr(hass: HomeAssistant, device_or_entity_id: string, attr_name: string, attr_value: string): boolean;
export declare function device_id(hass: HomeAssistant, entity_id: string): string | undefined;
