export const hassTestObject = {
	states: {
		'light.lounge': {
			state: 'on',
			attributes: {
				min_color_temp_kelvin: 2695,
				max_color_temp_kelvin: 6535,
				min_mireds: 153,
				max_mireds: 371,
				supported_color_modes: ['color_temp', 'rgb'],
				color_mode: 'color_temp',
				brightness: 155,
				color_temp_kelvin: 2695,
				color_temp: 371,
				hs_color: [28.406, 65.883],
				rgb_color: [255, 166, 86],
				xy_color: [0.527, 0.388],
				entity_id: ['light.lounge_light_1', 'light.lounge_light_2'],
				icon: 'mdi:ceiling-light',
				friendly_name: 'Lounge Ceiling',
				supported_features: 0,
			},
		},
		'input_number.volume': {
			state: 0,
			attributes: {
				initial: null,
				editable: true,
				min: 0,
				max: 100,
				step: 1,
				mode: 'slider',
				icon: 'mdi:numeric',
				friendly_name: 'Volume Slider',
			},
		},
	},
};
