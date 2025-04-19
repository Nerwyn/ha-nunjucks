import { HomeAssistant } from '../models/interfaces/hass';
import { DeviceRegistryEntry } from '../models/interfaces/registries';
export declare function device_entities(hass: HomeAssistant, device_id: string): string[];
export declare function device_attr(hass: HomeAssistant, device_or_entity_id: string, attr_name: keyof DeviceRegistryEntry): any;
export declare function is_device_attr(hass: HomeAssistant, device_or_entity_id: string, attr_name: keyof DeviceRegistryEntry, attr_value: string): boolean;
export declare function device_id(hass: HomeAssistant, entity_id: string): string | undefined;
