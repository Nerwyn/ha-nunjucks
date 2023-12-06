import { HomeAssistant } from 'custom-card-helpers';
export declare const CONTEXT: (hass: HomeAssistant) => {
    True: boolean;
    False: boolean;
    None: null;
    hass: HomeAssistant;
    states(entity_id: string): string;
    is_state(entity_id: string, value: string): boolean;
    state_attr(entity_id: string, attribute: string): any;
    is_state_attr(entity_id: string, attribute: string, value: string): boolean;
    has_value(entity_id: string): boolean;
    iif(condition: string, if_true: string, if_false?: string, if_none?: string): string | number | boolean;
    match_media(mediaquery: string): boolean;
};
