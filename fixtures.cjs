const cleanup = require('jsdom-global')();

exports.mochaGlobalSetup = async () => {
	const ha = document.createElement('home-assistant');
	ha.hass = {
		connected: true,
		connection: {
			connected: true,
			sendMessagePromise: (request) => {
				switch (request.type) {
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
								description: null,
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
		states: {},
	};
	document.body.appendChild(ha);
};

exports.mochaGlobalTeardown = () => {
	cleanup();
};
