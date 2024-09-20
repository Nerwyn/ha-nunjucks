export function expand(hass, ...args) {
    const res = [];
    for (let entity of args.flat(Infinity)) {
        if (typeof entity == 'string') {
            entity = hass.states[entity];
        }
        if (Array.isArray(entity.attributes?.entity_id)) {
            res.push(...expand(hass, ...entity.attributes?.entity_id));
        }
        else if (entity.attributes?.persons) {
            res.push(...expand(hass, ...entity.attributes?.persons));
        }
        else {
            res.push(entity);
        }
    }
    return Array.from(new Set(res)).sort((a, b) => a.entity_id.localeCompare(b.entity_id));
}
