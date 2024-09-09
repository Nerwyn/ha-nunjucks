import { HomeAssistant } from 'custom-card-helpers';

export function floors(hass: HomeAssistant) {
	try {
		const areas = hass['areas' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		const floorArr = [];
		for (const areaId in areas) {
			floorArr.push(areas[areaId].floor_id);
		}
		floorArr.sort();
		return Array.from(new Set(floorArr));
	} catch {
		return undefined;
	}
}

export function floor_id(hass: HomeAssistant, lookup_value: string) {
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
			areaId = entities[lookup_value].area_id ?? areaId;
			lookup_value = entities[lookup_value].device_id ?? lookup_value;
		}
		if (lookup_value) {
			if (devices[lookup_value]) {
				areaId = devices[lookup_value].area_id ?? areaId;
			}
			if (areas[areaId]) {
				return areas[areaId].floor_id;
			} else {
				for (const areaId in areas) {
					if (areas[areaId].name == lookup_value) {
						return areas[areaId].floor_id;
					}
				}
			}
		}
		return undefined;
	} catch {
		return undefined;
	}
}

export function floor_areas(hass: HomeAssistant, floor_id: string) {
	try {
		const res = [];
		if (floor_id) {
			const areas = hass['areas' as keyof HomeAssistant] as Record<
				string,
				Record<string, string>
			>;
			for (const areaId in areas) {
				if (areas[areaId].floor_id == floor_id) {
					res.push(areaId);
				}
			}
		}
		return res;
	} catch {
		return [];
	}
}
