import { HomeAssistant } from 'custom-card-helpers';

export function areas(hass: HomeAssistant) {
	try {
		return Object.keys(
			hass['areas' as keyof HomeAssistant] as Record<
				string,
				Record<string, string>
			>,
		);
	} catch {
		return [];
	}
}

export function area_id(hass: HomeAssistant, lookup_value: string) {
	try {
		const areas = hass['areas' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		const devices = hass['devices' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		const entities = hass['entities' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;

		if (entities[lookup_value]) {
			lookup_value = entities[lookup_value].device_id;
		}
		if (devices[lookup_value]) {
			return devices[lookup_value].area_id;
		}
		for (const areaId in areas) {
			if (areas[areaId].name == lookup_value) {
				return areaId;
			}
		}
		return undefined;
	} catch {
		return undefined;
	}
}

export function area_name(hass: HomeAssistant, lookup_value: string) {
	try {
		const areas = hass['areas' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		const devices = hass['devices' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		const entities = hass['entities' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;

		let areaId = lookup_value;
		if (entities[lookup_value]) {
			lookup_value = entities[lookup_value].device_id;
		}
		if (devices[lookup_value]) {
			areaId = devices[lookup_value].area_id;
		}
		if (areas[areaId]) {
			return areas[areaId].name;
		}
		return undefined;
	} catch {
		return undefined;
	}
}

export function area_entities(hass: HomeAssistant, area_name_or_id: string) {
	try {
		const deviceIds = area_devices(hass, area_name_or_id);
		const entities = hass['entities' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		const entityIds = [];
		for (const deviceId of deviceIds) {
			for (const entityId in entities) {
				if (entities[entityId].device_id == deviceId) {
					entityIds.push(entityId);
				}
			}
		}
		entityIds.sort();
		return entityIds;
	} catch {
		return [];
	}
}

export function area_devices(hass: HomeAssistant, area_name_or_id: string) {
	try {
		const areas = hass['areas' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		const devices = hass['devices' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		if (!(area_name_or_id in areas)) {
			for (const areaId in areas) {
				if (areas[areaId].name == area_name_or_id) {
					area_name_or_id = areaId;
					break;
				}
			}
		}
		const deviceIds = [];
		for (const deviceId in devices) {
			if (devices[deviceId].area_id == area_name_or_id) {
				deviceIds.push(deviceId);
			}
		}
		deviceIds.sort();
		return deviceIds;
	} catch {
		return [];
	}
}
