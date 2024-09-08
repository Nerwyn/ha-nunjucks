import { HomeAssistant } from 'custom-card-helpers';
export declare const CONTEXT: (hass: HomeAssistant) => {
    True: boolean;
    False: boolean;
    None: null;
    hass: HomeAssistant;
    states(entity_id: string, rounded?: boolean, with_unit?: boolean): string | number | undefined;
    is_state(entity_id: string, value: string): boolean;
    state_attr(entity_id: string, attribute: string): any;
    is_state_attr(entity_id: string, attribute: string, value: string): boolean;
    has_value(entity_id: string): boolean;
    is_hidden_entity(entity_id: string): string | false;
    device_entities(device_id: string): string[];
    device_attr(device_or_entity_id: string, attr_name: string): string | undefined;
    is_device_attr(device_or_entity_id: string, attr_name: string, attr_value: string): boolean;
    device_id(entity_id: string): string | undefined;
    iif(condition: string, if_true: string, if_false?: string, if_none?: string): string | boolean;
    match_media(mediaquery: string): boolean;
};
