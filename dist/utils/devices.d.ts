import { HomeAssistant } from 'custom-card-helpers';
export interface DeviceRegistryEntry {
    created_at: number;
    modified_at: number;
    id: string;
    config_entries: string[];
    connections: Array<[string, string]>;
    identifiers: Array<[string, string]>;
    manufacturer: string | null;
    model: string | null;
    model_id: string | null;
    name: string | null;
    labels: string[];
    sw_version: string | null;
    hw_version: string | null;
    serial_number: string | null;
    via_device_id: string | null;
    area_id: string | null;
    name_by_user: string | null;
    entry_type: 'service' | null;
    disabled_by: 'user' | 'integration' | 'config_entry' | null;
    configuration_url: string | null;
    primary_config_entry: string | null;
}
export declare const deviceRegistry: (hass: HomeAssistant) => Record<string, DeviceRegistryEntry>;
export declare function device_entities(hass: HomeAssistant, device_id: string): string[];
export declare function device_attr(hass: HomeAssistant, device_or_entity_id: string, attr_name: keyof DeviceRegistryEntry): any;
export declare function is_device_attr(hass: HomeAssistant, device_or_entity_id: string, attr_name: keyof DeviceRegistryEntry, attr_value: string): boolean;
export declare function device_id(hass: HomeAssistant, entity_id: string): string | undefined;
