interface RegistryEntry {
	created_at: number;
	modified_at: number;
}

export interface AreaRegistryEntry extends RegistryEntry {
	area_id: string;
	floor_id: string | null;
	name: string;
	picture: string | null;
	icon: string | null;
	labels: string[];
	aliases: string[];
}

export interface DeviceRegistryEntry extends RegistryEntry {
	id: string;
	config_entries: string[];
	connections: Array<[string, string]>;
	identifiers: Array<[string, string]>;
	manufacturer: string | null;
	model: string | null;
	model_id: string | null;
	name: string | null;
	labels: string[];
	sw_version: string | null;
	hw_version: string | null;
	serial_number: string | null;
	via_device_id: string | null;
	area_id: string | null;
	name_by_user: string | null;
	entry_type: 'service' | null;
	disabled_by: 'user' | 'integration' | 'config_entry' | null;
	configuration_url: string | null;
	primary_config_entry: string | null;
}

type EntityCategory = 'config' | 'diagnostic';
export interface EntityRegistryDisplayEntry {
	entity_id: string;
	name?: string;
	icon?: string;
	device_id?: string;
	area_id?: string;
	labels: string[];
	hidden?: boolean;
	entity_category?: EntityCategory;
	translation_key?: string;
	platform?: string;
	display_precision?: number;
}

export interface FloorRegistryEntry extends RegistryEntry {
	aliases: string[];
	floor_id: string;
	name: string;
	level?: number;
	icon?: string;
}

export interface LabelRegistryEntry extends RegistryEntry {
	label_id: string;
	name: string;
	icon?: string;
	color?: string;
	description?: string;
}
