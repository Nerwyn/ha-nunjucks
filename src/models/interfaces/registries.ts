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

interface SensorEntityOptions {
	display_precision?: number | null;
	suggested_display_precision?: number | null;
	unit_of_measurement?: string | null;
}

type LightColor =
	| {
			color_temp_kelvin: number;
	  }
	| {
			hs_color: [number, number];
	  }
	| {
			rgb_color: [number, number, number];
	  }
	| {
			rgbw_color: [number, number, number, number];
	  }
	| {
			rgbww_color: [number, number, number, number, number];
	  };

interface LightEntityOptions {
	favorite_colors?: LightColor[];
}

interface NumberEntityOptions {
	unit_of_measurement?: string | null;
}

interface LockEntityOptions {
	default_code?: string | null;
}

interface AlarmControlPanelEntityOptions {
	default_code?: string | null;
}

interface WeatherEntityOptions {
	precipitation_unit?: string | null;
	pressure_unit?: string | null;
	temperature_unit?: string | null;
	visibility_unit?: string | null;
	wind_speed_unit?: string | null;
}

interface SwitchAsXEntityOptions {
	entity_id: string;
	invert: boolean;
}

interface EntityRegistryOptions {
	number?: NumberEntityOptions;
	sensor?: SensorEntityOptions;
	alarm_control_panel?: AlarmControlPanelEntityOptions;
	lock?: LockEntityOptions;
	weather?: WeatherEntityOptions;
	light?: LightEntityOptions;
	switch_as_x?: SwitchAsXEntityOptions;
	conversation?: Record<string, unknown>;
	'cloud.alexa'?: Record<string, unknown>;
	'cloud.google_assistant'?: Record<string, unknown>;
}

export interface EntityRegistryEntry extends RegistryEntry {
	id: string;
	entity_id: string;
	name?: string;
	icon?: string;
	platform: string;
	config_entry_id?: string;
	config_subentry_id?: string;
	device_id?: string;
	area_id?: string;
	labels: string[];
	disabled_by?: 'user' | 'device' | 'integration' | 'config_entry';
	hidden_by: Exclude<EntityRegistryEntry['disabled_by'], 'config_entry'>;
	entity_category?: EntityCategory;
	has_entity_name: boolean;
	original_name?: string;
	unique_id: string;
	translation_key?: string;
	options?: EntityRegistryOptions;
	categories: Record<string, string>;
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

export interface ConfigEntry {
	entry_id: string;
	domain: string;
	title: string;
	source: string;
	state:
		| 'loaded'
		| 'setup_error'
		| 'migration_error'
		| 'setup_retry'
		| 'not_loaded'
		| 'failed_unload'
		| 'setup_in_progress';
	supports_options: boolean;
	supports_remove_device: boolean;
	supports_unload: boolean;
	supports_reconfigure: boolean;
	supported_subentry_types: Record<string, { supports_reconfigure: boolean }>;
	num_subentries: number;
	pref_disable_new_entities: boolean;
	pref_disable_polling: boolean;
	disabled_by?: 'user';
	reason?: string;
	error_reason_translation_key?: string;
	error_reason_translation_placeholders?: Record<string, string>;
}
