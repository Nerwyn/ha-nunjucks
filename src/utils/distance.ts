import { HomeAssistant } from 'custom-card-helpers';
import { HassEntities, HassEntity } from 'home-assistant-js-websocket';

// Author: https://github.com/maurycyp
// Source: https://github.com/maurycyp/vincenty
// License: https://github.com/maurycyp/vincenty/blob/master/LICENSE
function vincenty(
	point1: [number, number],
	point2: [number, number],
	miles: boolean = false,
): number | null | undefined {
	// short-circuit coincident points
	if (point1[0] == point2[0] && point1[1] == point2[1]) {
		return 0.0;
	}

	const MILES_PER_KILOMETER = 0.621371;
	const FLATTENING = 1 / 298.257223563;
	const MAX_ITERATIONS = 200;
	const CONVERGENCE_THRESHOLD = 1e-12;
	const AXIS_A = 6378137;
	const AXIS_B = 6356752.314245;

	const U1 = Math.atan(
		(1 - FLATTENING) * Math.tan((point1[0] * Math.PI) / 180),
	);
	const U2 = Math.atan(
		(1 - FLATTENING) * Math.tan((point2[0] * Math.PI) / 180),
	);
	let L = ((point2[1] - point1[1]) * Math.PI) / 180;
	let Lambda = L;

	const sinU1 = Math.sin(U1);
	const cosU1 = Math.cos(U1);
	const sinU2 = Math.sin(U2);
	const cosU2 = Math.cos(U2);

	let cosSqAlpha: number = 0;
	let sinSigma: number = 0;
	let cos2SigmaM: number = 0;
	let cosSigma: number = 0;
	let sigma: number = 0;
	for (let i = 0; i < MAX_ITERATIONS; i++) {
		const sinLambda = Math.sin(Lambda);
		const cosLambda = Math.cos(Lambda);
		sinSigma = Math.sqrt(
			(cosU2 * sinLambda) ** 2 +
				(cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) ** 2,
		);
		if (sinSigma == 0.0) {
			return 0.0; // coincident points
		}
		cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
		sigma = Math.atan2(sinSigma, cosSigma);
		const sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma;
		cosSqAlpha = 1 - sinAlpha ** 2;
		if (cosSqAlpha != 0) {
			cos2SigmaM = cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha;
		} else {
			cos2SigmaM = 0;
		}
		const C =
			(FLATTENING / 16) *
			cosSqAlpha *
			(4 + FLATTENING * (4 - 3 * cosSqAlpha));
		const LambdaPrev = Lambda;
		Lambda =
			L +
			(1 - C) *
				FLATTENING *
				sinAlpha *
				(sigma +
					C *
						sinSigma *
						(cos2SigmaM +
							C * cosSigma * (-1 + 2 * cos2SigmaM ** 2)));
		if (Math.abs(Lambda - LambdaPrev) < CONVERGENCE_THRESHOLD) {
			break; // successful convergence
		}
		if (i == MAX_ITERATIONS - 1) {
			return null; // failure to converge
		}
	}

	const uSq = (cosSqAlpha * (AXIS_A ** 2 - AXIS_B ** 2)) / AXIS_B ** 2;
	const A =
		1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
	const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
	const deltaSigma =
		B *
		sinSigma *
		(cos2SigmaM +
			(B / 4) *
				(cosSigma * (-1 + 2 * cos2SigmaM ** 2) -
					(B / 6) *
						cos2SigmaM *
						(-3 + 4 * sinSigma ** 2) *
						(-3 + 4 * cos2SigmaM ** 2)));
	let s = (AXIS_B * A * (sigma - deltaSigma)) / 1000;

	if (miles) {
		s *= MILES_PER_KILOMETER;
	}

	return s;
}

export function distance(hass: HomeAssistant, ...args: (string | number)[]) {
	try {
		let lat1, lat2, lon1, lon2: number;
		let i: number = 0;
		if (typeof args[0] == 'string') {
			lat1 = hass.states[args[0]].attributes.latitude;
			lon1 = hass.states[args[0]].attributes.longitude;
			i = 1;
		} else if (typeof args[0] == 'number') {
			if (!(typeof args[1] == 'number')) {
				throw Error('Latitude provided but not longitude 1');
			}
			lat1 = args[0];
			lon1 = args[1];
			i = 2;
		} else {
			return null;
		}
		if (typeof args[i] == 'string') {
			lat2 = hass.states[args[i]].attributes.latitude;
			lon2 = hass.states[args[i]].attributes.longitude;
		} else if (typeof args[i] == 'number') {
			if (!(typeof args[i + 1] == 'number')) {
				throw Error('Latitude provided but not longitude 2');
			}
			lat2 = args[i] as number;
			lon2 = args[i + 1] as number;
		} else {
			lat2 = hass.states['zone.home'].attributes.latitude;
			lon2 = hass.states['zone.home'].attributes.longitude;
		}

		return vincenty(
			[lat1, lon1],
			[lat2, lon2],
			hass.config.unit_system.length == 'mi',
		);
	} catch {
		return null;
	}
}

export function closest(
	hass: HomeAssistant,
	...args: (string | string[] | HassEntity | HassEntities)[]
) {
	function getEntityIdsByString(value: string) {
		if (value.startsWith('zone.')) {
			// Return all persons in a zone
			return hass.states[value].attributes.persons ?? [];
		}

		// Get all entities that match a provided entity_id or domain
		let entities = Object.keys(hass.states).filter(
			(entity) => entity == value || entity.split('.')[0] == value,
		);

		if (value == 'zone') {
			// Get all persons in all zones
			let persons: string[] = [];
			for (const entity of entities) {
				persons.push(...(hass.states[entity].attributes.persons ?? []));
			}
			entities = Array.from(new Set(persons));
		}
		return entities;
	}

	let home: [number, number];
	let start: number;
	if (args.length == 1) {
		home = [
			hass.states['zone.home'].attributes.latitude,
			hass.states['zone.home'].attributes.longitude,
		];
		start = 0;
	} else if (typeof args[0] == 'number') {
		if (!(typeof args[1] == 'number') || args.length == 2) {
			return null;
		}
		home = [args[0], args[1]];
		start = 2;
	} else if (typeof args[0] == 'object') {
		if (Array.isArray(args[0])) {
			return null;
		}
		// Assume is stateobj
		home = [
			(args[0] as HassEntity).attributes.latitude,
			(args[0] as HassEntity).attributes.longitude,
		];
		start = 1;
	} else if (typeof args[0] == 'string') {
		home = [
			hass.states[args[0]].attributes.latitude,
			hass.states[args[0]].attributes.longitude,
		];
		start = 1;
	} else {
		return null;
	}

	let entityIds: string[] = [];
	for (let i = start; i < args.length; i++) {
		if (typeof args[i] == 'object') {
			let entityIds0: string[] = [];
			if (Array.isArray(args[i] as string[])) {
				entityIds0 = args[i] as string[];
			} else if ((args[i] as HassEntity).entity_id) {
				if ((args[i] as HassEntity).entity_id.split('.')[0] == 'zone') {
					entityIds.push(
						...(args[i] as HassEntity).attributes.persons,
					);
				} else {
					entityIds.push(args[i] as string);
				}
			} else {
				entityIds0 = Object.keys(args[i]);
			}
			for (const entity of entityIds0) {
				entityIds.push(...getEntityIdsByString(entity));
			}
		} else if (typeof args[i] == 'string') {
			entityIds.push(...getEntityIdsByString(args[i] as string));
		}
	}
	entityIds = Array.from(new Set(entityIds));

	let res: HassEntity | null = null;
	let minDistance: number = Infinity;
	for (const entity of entityIds) {
		let stateObj: HassEntity;
		if (typeof entity == 'string') {
			stateObj = hass.states[entity];
		} else {
			stateObj = entity;
		}
		const lat = stateObj.attributes.latitude;
		const lon = stateObj.attributes.longitude;
		if (lat != undefined && lon != undefined) {
			const distance = vincenty(home, [lat, lon]) ?? Infinity;
			if (distance <= minDistance) {
				res = stateObj;
				minDistance = distance;
			}
		}
	}
	return res;
}
