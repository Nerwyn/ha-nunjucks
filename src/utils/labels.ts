import { HomeAssistant } from 'custom-card-helpers';

export function labels(hass: HomeAssistant, lookup_value?: string) {
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

		if (!lookup_value) {
			const labelArr = [];
			for (const ids of [entities, devices, areas]) {
				for (const id in ids) {
					labelArr.push(...(ids[id].labels ?? []));
				}
			}
			labelArr.sort();
			return Array.from(new Set(labelArr));
		}

		return (
			entities[lookup_value]?.labels ??
			devices[lookup_value]?.labels ??
			areas[lookup_value]?.labels
		);
	} catch {
		return [];
	}
}

export function label_areas(hass: HomeAssistant, label_id: string) {
	try {
		const areaIds = [];
		if (label_id) {
			const areas = hass['areas' as keyof HomeAssistant] as Record<
				string,
				Record<string, string>
			>;
			for (const areaId in areas) {
				if ((areas[areaId].labels ?? []).includes(label_id)) {
					areaIds.push(areaId);
				}
			}
			areaIds.sort();
		}
		return areaIds;
	} catch {
		return [];
	}
}

export function label_devices(hass: HomeAssistant, label_id: string) {
	try {
		const deviceIds = [];
		if (label_id) {
			const devices = hass['devices' as keyof HomeAssistant] as Record<
				string,
				Record<string, string>
			>;
			for (const devicesId in devices) {
				if ((devices[devicesId].labels ?? []).includes(label_id)) {
					deviceIds.push(devicesId);
				}
			}
			deviceIds.sort();
		}
		return deviceIds;
	} catch {
		return [];
	}
}

export function label_entities(hass: HomeAssistant, label_id: string) {
	try {
		const entityIds = [];
		if (label_id) {
			const entities = hass['entities' as keyof HomeAssistant] as Record<
				string,
				Record<string, string>
			>;
			for (const entityId in entities) {
				if ((entities[entityId].labels ?? []).includes(label_id)) {
					entityIds.push(entityId);
				}
			}
			entityIds.sort();
		}
		return entityIds;
	} catch {
		return [];
	}
}
