import { HomeAssistant } from 'custom-card-helpers';
import { state_attr } from './states';

export function device_entities(hass: HomeAssistant, device_id: string) {
	try {
		const res: string[] = [];
		const entities = hass[
			'entities' as keyof HomeAssistant
		] as unknown as Record<string, Record<string, string>>;
		for (const entityId in entities) {
			if (entities[entityId].device_id == device_id) {
				res.push(entityId);
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
	attr_name: string,
) {
	try {
		const devices = hass[
			'devices' as keyof HomeAssistant
		] as unknown as Record<string, Record<string, string>>;
		return (
			devices[device_or_entity_id]?.[attr_name] ??
			state_attr(hass, device_or_entity_id, attr_name)
		);
	} catch {
		return undefined;
	}
}

export function is_device_attr(
	hass: HomeAssistant,
	device_or_entity_id: string,
	attr_name: string,
	attr_value: string,
) {
	try {
		const deviceAttr = device_attr(hass, device_or_entity_id, attr_name);
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
	} catch {
		return false;
	}
}

export function device_id(hass: HomeAssistant, entity_id: string) {
	try {
		const entities = hass[
			'entities' as keyof HomeAssistant
		] as unknown as Record<string, Record<string, string>>;
		if (entities[entity_id]) {
			return entities[entity_id].device_id;
		}

		const devices = hass[
			'devices' as keyof HomeAssistant
		] as unknown as Record<string, Record<string, string>>;
		for (const deviceId in devices) {
			const device = devices[deviceId];
			if (device.name == entity_id || device.name_by_user == entity_id) {
				return deviceId;
			}
		}
	} catch {
		return undefined;
	}
}
