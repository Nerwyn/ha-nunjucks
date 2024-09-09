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
		if (lookup_value) {
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
				if (entities[lookup_value].area_id) {
					return entities[lookup_value].area_id;
				}
				lookup_value = entities[lookup_value].device_id ?? lookup_value;
			}
			if (devices[lookup_value]) {
				return devices[lookup_value].area_id;
			}
			for (const areaId in areas) {
				if (areas[areaId].name == lookup_value) {
					return areaId;
				}
			}
		}
		return undefined;
	} catch {
		return undefined;
	}
}

export function area_name(hass: HomeAssistant, lookup_value: string) {
	try {
		if (lookup_value) {
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
				areaId = entities[lookup_value].area_id ?? areaId;
				lookup_value = entities[lookup_value].device_id ?? lookup_value;
			}
			if (devices[lookup_value]) {
				areaId = devices[lookup_value].area_id ?? areaId;
			}
			if (areas[areaId]) {
				return areas[areaId].name;
			}
		}
		return undefined;
	} catch {
		return undefined;
	}
}

export function area_entities(hass: HomeAssistant, area_name_or_id: string) {
	try {
		const entityIds = [];
		if (area_name_or_id) {
			const deviceIds = area_devices(hass, area_name_or_id);
			const entities = hass['entities' as keyof HomeAssistant] as Record<
				string,
				Record<string, string>
			>;
			for (const deviceId of deviceIds) {
				for (const entityId in entities) {
					if (entities[entityId].device_id == deviceId) {
						entityIds.push(entityId);
					}
				}
			}
			entityIds.sort();
		}
		return entityIds;
	} catch {
		return [];
	}
}

export function area_devices(hass: HomeAssistant, area_name_or_id: string) {
	try {
		const deviceIds = [];
		if (area_name_or_id) {
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
			for (const deviceId in devices) {
				if (devices[deviceId].area_id == area_name_or_id) {
					deviceIds.push(deviceId);
				}
			}
			deviceIds.sort();
		}
		return deviceIds;
	} catch {
		return [];
	}
}
