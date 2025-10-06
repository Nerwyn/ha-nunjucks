import { HomeAssistant } from '../models/interfaces/hass';

export function floors(hass: HomeAssistant) {
	return Object.keys(hass.floors);
}

export function floor_id(hass: HomeAssistant, lookup_value: string) {
	try {
		let areaId = lookup_value;

		// Entity ID
		if (hass.entities[lookup_value]) {
			areaId = hass.entities[lookup_value].area_id ?? areaId;
			lookup_value =
				hass.entities[lookup_value].device_id ?? lookup_value;
		}
		if (lookup_value) {
			// Device ID
			if (hass.devices[lookup_value]) {
				areaId = hass.devices[lookup_value].area_id ?? areaId;
			}

			// Area ID
			if (hass.areas[areaId]) {
				return hass.areas[areaId].floor_id;
			} else {
				// Area name or alias
				for (const areaId in hass.areas) {
					if (
						hass.areas[areaId].name == lookup_value ||
						hass.areas[areaId].aliases?.includes(lookup_value)
					) {
						return hass.areas[areaId].floor_id;
					}
				}
			}

			// Floor name or alias
			for (const floorId in hass.floors) {
				if (
					hass.floors[floorId].name == lookup_value ||
					hass.floors[floorId].aliases?.includes(lookup_value)
				) {
					return floorId;
				}
			}
		}
		return undefined;
	} catch {
		return undefined;
	}
}

export function floor_name(hass: HomeAssistant, lookup_value: string) {
	if (hass.floors[lookup_value]) {
		return hass.floors[lookup_value].name;
	}

	const floorId = floor_id(hass, lookup_value);
	if (floorId) {
		return hass.floors[floorId].name;
	}
	return undefined;
}

export function floor_areas(hass: HomeAssistant, floor_name_or_id: string) {
	try {
		const res = [];
		if (floor_name_or_id) {
			let floorId: string | undefined = undefined;
			if (hass.floors[floor_name_or_id]) {
				floorId = floor_name_or_id;
			} else {
				for (const id in hass.floors) {
					if (
						hass.floors[id].name == floor_name_or_id ||
						hass.floors[id].aliases?.includes(floor_name_or_id)
					) {
						floorId = id;
						break;
					}
				}
			}
			if (!floorId) {
				return [];
			}

			for (const areaId in hass.areas) {
				if (hass.areas[areaId].floor_id == floorId) {
					res.push(areaId);
				}
			}
		}
		return res;
	} catch {
		return [];
	}
}

export function floor_entities(hass: HomeAssistant, floor_name_or_id: string) {
	try {
		const res = new Set<string>();
		const areas = floor_areas(hass, floor_name_or_id);
		for (const entityId in hass.entities) {
			if (areas.includes(hass.entities[entityId].area_id as string)) {
				res.add(entityId);
				for (const subEntityId of hass.states[entityId]?.attributes
					?.entity_id ?? []) {
					res.add(subEntityId);
				}
			}
		}
		return Array.from(res);
	} catch {
		return [];
	}
}
