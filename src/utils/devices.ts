import { HomeAssistant } from 'custom-card-helpers';
import { entityRegistry } from './entities';
import { state_attr } from './states';

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

export const deviceRegistry = (hass: HomeAssistant) =>
	hass['devices' as keyof HomeAssistant] as unknown as Record<
		string,
		DeviceRegistryEntry
	>;

export function device_entities(hass: HomeAssistant, device_id: string) {
	try {
		const res: string[] = [];
		if (device_id) {
			for (const entityId in entityRegistry(hass)) {
				if (entityRegistry(hass)[entityId].device_id == device_id) {
					res.push(entityId);
				}
			}
		}
		return res;
	} catch {
		return [];
	}
}

export function device_attr(
	hass: HomeAssistant,
	device_or_entity_id: string,
	attr_name: keyof DeviceRegistryEntry,
) {
	try {
		return (
			deviceRegistry(hass)[device_or_entity_id]?.[attr_name] ??
			state_attr(hass, device_or_entity_id, attr_name)
		);
	} catch {
		return undefined;
	}
}

export function is_device_attr(
	hass: HomeAssistant,
	device_or_entity_id: string,
	attr_name: keyof DeviceRegistryEntry,
	attr_value: string,
) {
	try {
		if (attr_value != undefined) {
			const deviceAttr = device_attr(
				hass,
				device_or_entity_id,
				attr_name,
			);
			if (
				typeof attr_value == 'string' &&
				attr_value.startsWith('[') &&
				attr_value.endsWith(']')
			) {
				attr_value = JSON.parse(attr_value);
			}
			if (Array.isArray(attr_value)) {
				return attr_value.includes(deviceAttr);
			}
			return deviceAttr == attr_value;
		}
		return false;
	} catch {
		return false;
	}
}

export function device_id(hass: HomeAssistant, entity_id: string) {
	try {
		if (entity_id) {
			if (entityRegistry(hass)[entity_id]) {
				return entityRegistry(hass)[entity_id].device_id;
			}

			for (const deviceId in deviceRegistry(hass)) {
				const device = deviceRegistry(hass)[deviceId];
				if (
					device.name == entity_id ||
					device.name_by_user == entity_id
				) {
					return deviceId;
				}
			}
		}
		return undefined;
	} catch {
		return undefined;
	}
}
