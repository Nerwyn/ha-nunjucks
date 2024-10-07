import { HomeAssistant } from 'custom-card-helpers';
import { deviceRegistry } from './devices';
import { entityRegistry } from './entities';

export interface AreaRegistryEntry {
	created_at: number;
	modified_at: number;
	area_id: string;
	floor_id: string | null;
	name: string;
	picture: string | null;
	icon: string | null;
	labels: string[];
	aliases: string[];
}

export const areaRegistry = (hass: HomeAssistant) =>
	hass['areas' as keyof HomeAssistant] as unknown as Record<
		string,
		AreaRegistryEntry
	>;

export function areas(hass: HomeAssistant) {
	try {
		return Object.keys(areaRegistry(hass));
	} catch {
		return [];
	}
}

export function area_id(hass: HomeAssistant, lookup_value: string) {
	try {
		if (lookup_value) {
			if (entityRegistry(hass)[lookup_value]) {
				if (entityRegistry(hass)[lookup_value].area_id) {
					return entityRegistry(hass)[lookup_value].area_id;
				}
				lookup_value =
					entityRegistry(hass)[lookup_value].device_id ??
					lookup_value;
			}
			if (deviceRegistry(hass)[lookup_value]) {
				return deviceRegistry(hass)[lookup_value].area_id;
			}
			for (const areaId in areaRegistry(hass)) {
				if (areaRegistry(hass)[areaId].name == lookup_value) {
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
			if (entityRegistry(hass)[lookup_value]) {
				areaId = entityRegistry(hass)[lookup_value].area_id ?? areaId;
				lookup_value =
					entityRegistry(hass)[lookup_value].device_id ??
					lookup_value;
			}
			if (deviceRegistry(hass)[lookup_value]) {
				areaId = deviceRegistry(hass)[lookup_value].area_id ?? areaId;
			}
			if (areaRegistry(hass)[areaId]) {
				return areaRegistry(hass)[areaId].name;
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
				for (const entityId in entityRegistry(hass)) {
					if (entityRegistry(hass)[entityId].device_id == deviceId) {
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
			if (!(area_name_or_id in areaRegistry(hass))) {
				for (const areaId in areaRegistry(hass)) {
					if (areaRegistry(hass)[areaId].name == area_name_or_id) {
						area_name_or_id = areaId;
						break;
					}
				}
			}
			for (const deviceId in deviceRegistry(hass)) {
				if (deviceRegistry(hass)[deviceId].area_id == area_name_or_id) {
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
