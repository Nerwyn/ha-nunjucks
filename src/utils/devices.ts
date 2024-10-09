import { HomeAssistant } from '../models/hass';
import { DeviceRegistryEntry } from '../models/registries';
import { state_attr } from './states';

export function device_entities(hass: HomeAssistant, device_id: string) {
	try {
		const res: string[] = [];
		if (device_id) {
			for (const entityId in hass.entities) {
				if (hass.entities[entityId].device_id == device_id) {
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
			hass.devices[device_or_entity_id]?.[attr_name] ??
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
			return (
				device_attr(hass, device_or_entity_id, attr_name) == attr_value
			);
		}
		return false;
	} catch {
		return false;
	}
}

export function device_id(hass: HomeAssistant, entity_id: string) {
	try {
		if (entity_id) {
			if (hass.entities[entity_id]) {
				return hass.entities[entity_id].device_id;
			}

			for (const deviceId in hass.devices) {
				const device = hass.devices[deviceId];
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
