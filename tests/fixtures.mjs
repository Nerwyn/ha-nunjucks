import 'global-jsdom/register';
import { fetchConfigEntries } from '../src/utils/config_entry';
import { fetchEntityRegistry } from '../src/utils/entities';
import { fetchLabelRegistry } from '../src/utils/labels';

export async function mochaGlobalSetup() {
	const ha = document.createElement('home-assistant');
	ha.hass = {
		connected: true,
		connection: {
			connected: true,
			sendMessagePromise: (request) => {
				switch (request.type) {
					case 'config/entity_registry/list':
						return [
							{
								area_id: null,
								categories: {},
								config_entry_id: '6e90d52c9ed31698e6be9a5b2df42c74',
								config_subentry_id: null,
								created_at: 0,
								device_id: 'b482c9c4c6b862ba6e0c9a5560310ca1',
								disabled_by: null,
								entity_category: null,
								entity_id: 'light.ceiling_bulb_1',
								has_entity_name: true,
								hidden_by: 'integration',
								icon: 'mdi:lightbulb',
								id: '02b06ad433b826ebbaf8c731be9f84a2',
								labels: [],
								modified_at: 0,
								name: 'Ceiling Light 1',
								options: {
									conversation: {
										should_expose: false,
									},
								},
								original_name: null,
								platform: 'meross_lan',
								translation_key: null,
								unique_id: '2010230039678090831848e1e9375232_0',
								aliases: [],
								capabilities: {
									min_color_temp_kelvin: 2700,
									max_color_temp_kelvin: 6500,
									min_mireds: 153,
									max_mireds: 370,
									supported_color_modes: ['color_temp', 'rgb'],
								},
								device_class: null,
								original_device_class: null,
								original_icon: null,
							},
							{
								area_id: null,
								categories: {},
								config_entry_id: 'b2a208c58f6ed7b83b83e0ced9392303',
								config_subentry_id: null,
								created_at: 0,
								device_id: '65471c4bd1b66fe48a51df2c29e3cc36',
								disabled_by: null,
								entity_category: null,
								entity_id: 'light.ceiling_bulb_2',
								has_entity_name: true,
								hidden_by: 'integration',
								icon: 'mdi:lightbulb',
								id: '0601c97c3308c3a719954215c0a487f0',
								labels: [],
								modified_at: 0,
								name: 'Ceiling Light 2',
								options: {
									conversation: {
										should_expose: false,
									},
								},
								original_name: null,
								platform: 'meross_lan',
								translation_key: null,
								unique_id: '2010237843735090831848e1e9378766_0',
								aliases: [],
								capabilities: {
									min_color_temp_kelvin: 2700,
									max_color_temp_kelvin: 6500,
									min_mireds: 153,
									max_mireds: 370,
									supported_color_modes: ['color_temp', 'rgb'],
								},
								device_class: null,
								original_device_class: null,
								original_icon: null,
							},
						];
					case 'config/label_registry/list':
						return [
							{
								color: 'yellow',
								created_at: 0,
								description: null,
								icon: 'm3s:light-group-rounded-filled',
								label_id: 'lighting',
								name: 'Lighting',
								modified_at: 0,
							},
							{
								color: 'light-green',
								created_at: 0,
								description: null,
								icon: 'mdi:ceiling-fan',
								label_id: 'lounge_ceiling_fan',
								name: 'Lounge Ceiling Fan',
								modified_at: 0,
							},
							{
								color: 'red',
								created_at: 0,
								description: null,
								icon: 'mdi:remote',
								label_id: 'ir',
								name: 'Infrared Remote',
								modified_at: 0,
							},
							{
								color: 'green',
								created_at: 0,
								description: 'There be bugs here',
								icon: 'mdi:weather-sunny',
								label_id: 'outside',
								name: 'Outside',
								modified_at: 0,
							},
						];
					default:
						return [];
				}
			},
		},
		callWS: (request) => {
			switch (request.type) {
				case 'config_entries/get':
					return [
						{
							created_at: 0,
							entry_id: '6e90d52c9ed31698e6be9a5b2df42c74',
							domain: 'meross_lan',
							modified_at: 1765689454.941518,
							title: 'Ceiling Light 1',
							source: 'user',
							state: 'loaded',
							supports_options: true,
							supports_remove_device: false,
							supports_unload: true,
							supports_reconfigure: false,
							supported_subentry_types: {},
							pref_disable_new_entities: false,
							pref_disable_polling: false,
							disabled_by: null,
							reason: null,
							error_reason_translation_key: null,
							error_reason_translation_placeholders: null,
							num_subentries: 0,
						},
						{
							created_at: 0,
							entry_id: 'b2a208c58f6ed7b83b83e0ced9392303',
							domain: 'meross_lan',
							modified_at: 1765689449.76734,
							title: 'Ceiling Light 2',
							source: 'user',
							state: 'loaded',
							supports_options: true,
							supports_remove_device: false,
							supports_unload: true,
							supports_reconfigure: false,
							supported_subentry_types: {},
							pref_disable_new_entities: false,
							pref_disable_polling: false,
							disabled_by: null,
							reason: null,
							error_reason_translation_key: null,
							error_reason_translation_placeholders: null,
							num_subentries: 0,
						},
					];
				default:
					return [];
			}
		},
		states: {},
	};
	document.body.appendChild(ha);

	await import('../src/index');
	await fetchLabelRegistry(ha.hass);
	await fetchEntityRegistry(ha.hass);
	await fetchConfigEntries(ha.hass);
}
