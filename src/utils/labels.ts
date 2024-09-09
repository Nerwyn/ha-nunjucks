import { HomeAssistant } from 'custom-card-helpers';

export function labels(hass: HomeAssistant, lookup_value?: string) {
	try {
		if (!lookup_value) {
			const labels = (
				hass.connection as unknown as Record<
					string,
					Record<string, Record<string, string>[]>
				>
			)._labelRegistry.state;
			return labels.map((label) => label.label_id);
		}

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
		return (
			entities[lookup_value]?.labels ??
			devices[lookup_value]?.labels ??
			areas[lookup_value]?.labels
		);
	} catch {
		return [];
	}
}

export function label_id(hass: HomeAssistant, lookup_value: string) {
	try {
		const labels = (
			hass.connection as unknown as Record<
				string,
				Record<string, Record<string, string>[]>
			>
		)._labelRegistry.state;
		return labels.filter((label) => label.name == lookup_value)[0].label_id;
	} catch {
		return undefined;
	}
}

export function label_name(hass: HomeAssistant, lookup_value: string) {
	try {
		const labels = (
			hass.connection as unknown as Record<
				string,
				Record<string, Record<string, string>[]>
			>
		)._labelRegistry.state;
		return labels.filter((label) => label.label_id == lookup_value)[0].name;
	} catch {
		return undefined;
	}
}

export function label_areas(hass: HomeAssistant, label_name_or_id: string) {
	try {
		const labelId = label_id(hass, label_name_or_id) ?? label_name_or_id;
		const areas = hass['areas' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		const areaIds = [];
		for (const areaId in areas) {
			if ((areas[areaId].labels ?? []).includes(labelId)) {
				areaIds.push(areaId);
			}
		}
		areaIds.sort();
		return areaIds;
	} catch {
		return [];
	}
}

export function label_devices(hass: HomeAssistant, label_name_or_id: string) {
	try {
		const labelId = label_id(hass, label_name_or_id) ?? label_name_or_id;
		const devices = hass['devices' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		const deviceIds = [];
		for (const devicesId in devices) {
			if ((devices[devicesId].labels ?? []).includes(labelId)) {
				deviceIds.push(devicesId);
			}
		}
		deviceIds.sort();
		return deviceIds;
	} catch {
		return [];
	}
}

export function label_entities(hass: HomeAssistant, label_name_or_id: string) {
	try {
		const labelId = label_id(hass, label_name_or_id) ?? label_name_or_id;
		const entities = hass['entities' as keyof HomeAssistant] as Record<
			string,
			Record<string, string>
		>;
		const entityIds = [];
		for (const entityId in entities) {
			if ((entities[entityId].labels ?? []).includes(labelId)) {
				entityIds.push(entityId);
			}
		}
		entityIds.sort();
		return entityIds;
	} catch {
		return [];
	}
}
