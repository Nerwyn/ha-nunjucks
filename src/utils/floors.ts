import { HomeAssistant } from '../models/interfaces/hass';

export function floors(hass: HomeAssistant) {
	return Object.keys(hass.floors);
}

export function floor_id(hass: HomeAssistant, lookup_value: string) {
	try {
		let areaId = lookup_value;
		if (hass.entities[lookup_value]) {
			areaId = hass.entities[lookup_value].area_id ?? areaId;
			lookup_value =
				hass.entities[lookup_value].device_id ?? lookup_value;
		}
		if (lookup_value) {
			if (hass.devices[lookup_value]) {
				areaId = hass.devices[lookup_value].area_id ?? areaId;
			}
			if (hass.areas[areaId]) {
				return hass.areas[areaId].floor_id;
			} else {
				for (const areaId in hass.areas) {
					if (hass.areas[areaId].name == lookup_value) {
						return hass.areas[areaId].floor_id;
					}
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
					if (hass.floors[id].name == floor_name_or_id) {
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
