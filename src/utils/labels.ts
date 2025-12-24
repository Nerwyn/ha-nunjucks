import { HomeAssistant } from '../models/interfaces/hass';
import { LabelRegistryEntry } from '../models/interfaces/registries';

export async function fetchLabelRegistry(hass: HomeAssistant) {
	const labels: LabelRegistryEntry[] = await hass.connection.sendMessagePromise(
		{
			type: 'config/label_registry/list',
		},
	);
	labels.sort((ent1, ent2) => ent1.name.localeCompare(ent2.name));
	window.haNunjucks.labelRegistry = labels;
}

export function labels(hass: HomeAssistant, lookup_value?: string) {
	try {
		if (!lookup_value) {
			return window.haNunjucks.labelRegistry.map((entry) => entry.label_id);
		}
		return (
			hass.entities[lookup_value]?.labels ??
			hass.devices[lookup_value]?.labels ??
			hass.areas[lookup_value]?.labels ??
			[]
		);
	} catch {
		return [];
	}
}

export function label_id(lookup_value: string) {
	return window.haNunjucks.labelRegistry.find(
		(entry) => entry.name == lookup_value,
	)?.label_id;
}

export function label_name(lookup_value: string) {
	return window.haNunjucks.labelRegistry.find(
		(entry) => entry.label_id == lookup_value,
	)?.name;
}

export function label_description(lookup_value: string) {
	return window.haNunjucks.labelRegistry.find(
		(entry) => entry.label_id == lookup_value,
	)?.description;
}

export function label_areas(hass: HomeAssistant, label_name_or_id: string) {
	try {
		const areaIds = [];
		let labelId: string | undefined = undefined;
		if (label_name_or_id) {
			if (
				window.haNunjucks.labelRegistry.find(
					(entry) => entry.label_id == label_name_or_id,
				)
			) {
				labelId = label_name_or_id;
			} else {
				labelId = label_id(label_name_or_id);
			}
			if (!labelId) {
				return [];
			}
			for (const areaId in hass.areas) {
				if ((hass.areas[areaId].labels ?? []).includes(labelId)) {
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

export function label_devices(hass: HomeAssistant, label_name_or_id: string) {
	try {
		const deviceIds = [];
		if (label_name_or_id) {
			let labelId: string | undefined = undefined;
			if (
				window.haNunjucks.labelRegistry.find(
					(entry) => entry.label_id == label_name_or_id,
				)
			) {
				labelId = label_name_or_id;
			} else {
				labelId = label_id(label_name_or_id);
			}
			if (!labelId) {
				return [];
			}
			for (const devicesId in hass.devices) {
				if ((hass.devices[devicesId].labels ?? []).includes(labelId)) {
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

export function label_entities(hass: HomeAssistant, label_name_or_id: string) {
	try {
		const entityIds = [];
		if (label_name_or_id) {
			let labelId: string | undefined = undefined;
			if (
				window.haNunjucks.labelRegistry.find(
					(entry) => entry.label_id == label_name_or_id,
				)
			) {
				labelId = label_name_or_id;
			} else {
				labelId = label_id(label_name_or_id);
			}
			if (!labelId) {
				return [];
			}
			for (const entityId in hass.entities) {
				if ((hass.entities[entityId].labels ?? []).includes(labelId)) {
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
