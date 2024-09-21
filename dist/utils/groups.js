export function expand(hass, ...args) {
    const res = [];
    for (let entity of args.flat(Infinity)) {
        if (typeof entity == 'string') {
            entity = hass.states[entity];
        }
        if (entity) {
            if (Array.isArray(entity.attributes?.entity_id)) {
                res.push(...expand(hass, ...entity.attributes?.entity_id));
            }
            else if (entity?.attributes?.persons) {
                res.push(...expand(hass, ...entity.attributes.persons));
            }
            else {
                if (entity.entity_id) {
                    res.push(entity);
                }
                else {
                    const entities = Object.values(entity);
                    if (entities[0]?.entity_id) {
                        res.push(...entities);
                    }
                    else {
                        for (const domain of entities) {
                            const stateObjects = Object.values(domain);
                            for (const stateObj of stateObjects) {
                                if (stateObj?.attributes?.persons) {
                                    res.push(...expand(hass, ...stateObj.attributes.persons));
                                }
                                else {
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
        .filter((value, index, self) => index ==
        self.findIndex((obj) => obj.entity_id == value.entity_id))
        .sort((a, b) => a.entity_id.localeCompare(b.entity_id));
}
