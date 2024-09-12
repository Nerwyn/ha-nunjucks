"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTEXT = void 0;
const py_datetime_1 = __importDefault(require("py-datetime"));
const areas_1 = require("./utils/areas");
const css_1 = require("./utils/css");
const devices_1 = require("./utils/devices");
const entities_1 = require("./utils/entities");
const floors_1 = require("./utils/floors");
const iif_1 = require("./utils/iif");
const integrations_1 = require("./utils/integrations");
const labels_1 = require("./utils/labels");
const states_1 = require("./utils/states");
const time_1 = require("./utils/time");
const CONTEXT = (hass) => ({
    True: true,
    False: false,
    None: null,
    hass: hass,
    // States
    states(entity_id, rounded, with_unit) {
        return (0, states_1.states)(hass, entity_id, rounded, with_unit);
    },
    is_state(entity_id, value) {
        return (0, states_1.is_state)(hass, entity_id, value);
    },
    state_attr(entity_id, attribute) {
        return (0, states_1.state_attr)(hass, entity_id, attribute);
    },
    is_state_attr(entity_id, attribute, value) {
        return (0, states_1.is_state_attr)(hass, entity_id, attribute, value);
    },
    has_value(entity_id) {
        return (0, states_1.has_value)(hass, entity_id);
    },
    state_translated(entity_id, state) {
        return (0, states_1.state_translated)(hass, entity_id, state);
    },
    attr_name_translated(entity_id, attr_name, attr_value) {
        return (0, states_1.attr_name_translated)(hass, entity_id, attr_name, attr_value);
    },
    attr_value_translated(entity_id, attr_name, attr_value) {
        return (0, states_1.attr_value_translated)(hass, entity_id, attr_name, attr_value);
    },
    // Entities
    is_hidden_entity(entity_id) {
        return (0, entities_1.is_hidden_entity)(hass, entity_id);
    },
    // Devices
    device_entities(device_id) {
        return (0, devices_1.device_entities)(hass, device_id);
    },
    device_attr(device_or_entity_id, attr_name) {
        return (0, devices_1.device_attr)(hass, device_or_entity_id, attr_name);
    },
    is_device_attr(device_or_entity_id, attr_name, attr_value) {
        return (0, devices_1.is_device_attr)(hass, device_or_entity_id, attr_name, attr_value);
    },
    device_id(entity_id) {
        return (0, devices_1.device_id)(hass, entity_id);
    },
    // Floors
    floors() {
        return (0, floors_1.floors)(hass);
    },
    floor_id(lookup_value) {
        return (0, floors_1.floor_id)(hass, lookup_value);
    },
    floor_areas(floor_id) {
        return (0, floors_1.floor_areas)(hass, floor_id);
    },
    // Areas
    areas() {
        return (0, areas_1.areas)(hass);
    },
    area_id(lookup_value) {
        return (0, areas_1.area_id)(hass, lookup_value);
    },
    area_name(lookup_value) {
        return (0, areas_1.area_name)(hass, lookup_value);
    },
    area_entities(area_name_or_id) {
        return (0, areas_1.area_entities)(hass, area_name_or_id);
    },
    area_devices(area_name_or_id) {
        return (0, areas_1.area_devices)(hass, area_name_or_id);
    },
    // Integrations
    integration_entities(integration) {
        return (0, integrations_1.integration_entities)(hass, integration);
    },
    // Labels
    labels(lookup_value) {
        return (0, labels_1.labels)(hass, lookup_value);
    },
    label_areas(label_name_or_id) {
        return (0, labels_1.label_areas)(hass, label_name_or_id);
    },
    label_devices(label_name_or_id) {
        return (0, labels_1.label_devices)(hass, label_name_or_id);
    },
    label_entities(label_name_or_id) {
        return (0, labels_1.label_entities)(hass, label_name_or_id);
    },
    // Immediate If
    iif(condition, if_true, if_false, if_none) {
        return (0, iif_1.iif)(hass, condition, if_true, if_false, if_none);
    },
    // Time
    dt() {
        return py_datetime_1.default;
    },
    now() {
        return (0, time_1.now)();
    },
    utcnow() {
        return (0, time_1.utcnow)();
    },
    today_at(value) {
        return (0, time_1.today_at)(value);
    },
    as_datetime(value, fallback) {
        return (0, time_1.as_datetime)(value, fallback);
    },
    as_timestamp(value, fallback) {
        return (0, time_1.as_timestamp)(value, fallback);
    },
    as_local(value) {
        return (0, time_1.as_local)(value);
    },
    strptime(value, format, fallback) {
        return (0, time_1.strptime)(value, format, fallback);
    },
    timedelta(days, seconds, microseconds, milliseconds, minutes, hours, weeks) {
        return (0, time_1.timedelta)(days, seconds, microseconds, milliseconds, minutes, hours, weeks);
    },
    // CSS
    match_media(mediaquery) {
        return (0, css_1.match_media)(mediaquery);
    },
});
exports.CONTEXT = CONTEXT;
