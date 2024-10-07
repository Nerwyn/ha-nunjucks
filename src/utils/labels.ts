import { HomeAssistant } from 'custom-card-helpers';
import { areaRegistry } from './areas';
import { deviceRegistry } from './devices';
import { entityRegistry } from './entities';

interface LabelRegistryEntry {
	created_at: number;
	modified_at: number;
	label_id: string;
	name: string;
	icon?: string;
	color?: string;
	description?: string;
}

const labelRegistry: Record<string, LabelRegistryEntry> = {};

export async function fetchLabelRegistry(hass: HomeAssistant) {
	if (hass.connection) {
		const labelRegistryArray = await hass.connection
			.sendMessagePromise({
				type: 'config/label_registry/list',
			})
			.then((labels) =>
				(labels as LabelRegistryEntry[]).sort((ent1, ent2) =>
					ent1.name.localeCompare(ent2.name),
				),
			);
		for (const labelRegistryEntry of labelRegistryArray) {
			labelRegistry[labelRegistryEntry.label_id] = labelRegistryEntry;
		}
	}
}

export function labels(hass: HomeAssistant, lookup_value?: string) {
	try {
		if (!lookup_value) {
			return Object.keys(labelRegistry);
		}

		return (
			entityRegistry(hass)[lookup_value]?.labels ??
			deviceRegistry(hass)[lookup_value]?.labels ??
			areaRegistry(hass)[lookup_value]?.labels
		);
	} catch {
		return [];
	}
}

export function label_id(lookup_value: string) {
	for (const id in labelRegistry) {
		console.log(labelRegistry[id]);
		if (labelRegistry[id].name == lookup_value) {
			return id;
		}
	}
	return undefined;
}

export function label_name(lookup_value: string) {
	return labelRegistry[lookup_value].name;
}

export function label_areas(hass: HomeAssistant, label_name_or_id: string) {
	try {
		const areaIds = [];
		let labelId: string | undefined = undefined;
		if (label_name_or_id) {
			if (labelRegistry[label_name_or_id]) {
				labelId = label_name_or_id;
			} else {
				labelId = label_id(label_name_or_id);
			}
			if (!labelId) {
				return [];
			}
			for (const areaId in areaRegistry(hass)) {
				if (
					(areaRegistry(hass)[areaId].labels ?? []).includes(labelId)
				) {
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
			if (labelRegistry[label_name_or_id]) {
				labelId = label_name_or_id;
			} else {
				labelId = label_id(label_name_or_id);
			}
			if (!labelId) {
				return [];
			}
			for (const devicesId in deviceRegistry(hass)) {
				if (
					(deviceRegistry(hass)[devicesId].labels ?? []).includes(
						labelId,
					)
				) {
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
			if (labelRegistry[label_name_or_id]) {
				labelId = label_name_or_id;
			} else {
				labelId = label_id(label_name_or_id);
			}
			if (!labelId) {
				return [];
			}
			for (const entityId in entityRegistry(hass)) {
				if (
					(entityRegistry(hass)[entityId].labels ?? []).includes(
						labelId,
					)
				) {
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
