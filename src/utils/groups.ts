import { HomeAssistant } from 'custom-card-helpers';
import { HassEntities, HassEntity } from 'home-assistant-js-websocket';

export function expand(
	hass: HomeAssistant,
	...args: (string | HassEntity | HassEntities)[]
) {
	const res: HassEntity[] = [];
	for (let entity of args.flat(Infinity)) {
		if (typeof entity == 'string') {
			entity = hass.states[entity];
		}
		if (entity) {
			if (Array.isArray(entity.attributes?.entity_id)) {
				res.push(...expand(hass, ...entity.attributes?.entity_id));
			} else if ((entity as HassEntity)?.attributes?.persons) {
				res.push(
					...expand(
						hass,
						...(entity as HassEntity).attributes.persons,
					),
				);
			} else {
				if ((entity as HassEntity).entity_id) {
					res.push(entity as HassEntity);
				} else {
					const entities = Object.values(entity);
					if ((entities[0] as HassEntity)?.entity_id) {
						res.push(...entities);
					} else {
						for (const domain of entities) {
							const stateObjects = Object.values(
								domain as HassEntities,
							);
							for (const stateObj of stateObjects) {
								if (stateObj?.attributes?.persons) {
									res.push(
										...expand(
											hass,
											...stateObj.attributes.persons,
										),
									);
								} else {
									res.push(stateObj);
								}
							}
						}
					}
				}
			}
		}
	}
	return res
		.filter(
			(value, index, self) =>
				index ==
				self.findIndex((obj) => obj.entity_id == value.entity_id),
		)
		.sort((a, b) => a.entity_id.localeCompare(b.entity_id));
}
