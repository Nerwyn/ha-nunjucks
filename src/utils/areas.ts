import { HomeAssistant } from '../models/interfaces/hass';

export function areas(hass: HomeAssistant) {
	try {
		return Object.keys(hass.areas);
	} catch {
		return [];
	}
}

export function area_id(hass: HomeAssistant, lookup_value: string) {
	try {
		if (lookup_value) {
			if (hass.entities[lookup_value]) {
				if (hass.entities[lookup_value].area_id) {
					return hass.entities[lookup_value].area_id;
				}
				lookup_value =
					hass.entities[lookup_value].device_id ?? lookup_value;
			}
			if (hass.devices[lookup_value]) {
				return hass.devices[lookup_value].area_id;
			}
			for (const areaId in hass.areas) {
				if (hass.areas[areaId].name == lookup_value) {
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
			let areaId = lookup_value;
			if (hass.entities[lookup_value]) {
				areaId = hass.entities[lookup_value].area_id ?? areaId;
				lookup_value =
					hass.entities[lookup_value].device_id ?? lookup_value;
			}
			if (hass.devices[lookup_value]) {
				areaId = hass.devices[lookup_value].area_id ?? areaId;
			}
			if (hass.areas[areaId]) {
				return hass.areas[areaId].name;
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
			for (const deviceId of deviceIds) {
				for (const entityId in hass.entities) {
					if (hass.entities[entityId].device_id == deviceId) {
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
			if (!(area_name_or_id in hass.areas)) {
				for (const areaId in hass.areas) {
					if (hass.areas[areaId].name == area_name_or_id) {
						area_name_or_id = areaId;
						break;
					}
				}
			}
			for (const deviceId in hass.devices) {
				if (hass.devices[deviceId].area_id == area_name_or_id) {
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
