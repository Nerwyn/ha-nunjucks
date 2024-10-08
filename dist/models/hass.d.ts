import { Auth, Connection, HassConfig, HassEntities, HassEntity, HassServices, MessageBase } from 'home-assistant-js-websocket';
import { AreaRegistryEntry, DeviceRegistryEntry, EntityRegistryDisplayEntry, FloorRegistryEntry } from './registries';
export interface HomeAssistant {
    auth: Auth;
    connection: Connection;
    connected: boolean;
    states: HassEntities;
    entities: {
        [id: string]: EntityRegistryDisplayEntry;
    };
    devices: {
        [id: string]: DeviceRegistryEntry;
    };
    areas: {
        [id: string]: AreaRegistryEntry;
    };
    floors: {
        [id: string]: FloorRegistryEntry;
    };
    services: HassServices;
    config: HassConfig;
    panelUrl: string;
    language: string;
    selectedLanguage: string | null;
    suspendWhenHidden: boolean;
    enableShortcuts: boolean;
    vibrate: boolean;
    debugConnection: boolean;
    dockedSidebar: 'docked' | 'always_hidden' | 'auto';
    defaultPanel: string;
    moreInfoEntityId: string | null;
    callApi<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, parameters?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
    fetchWithAuth(path: string, init?: Record<string, any>): Promise<Response>;
    sendWS(msg: MessageBase): void;
    callWS<T>(msg: MessageBase): Promise<T>;
    formatEntityState(stateObj: HassEntity, state?: string): string;
    formatEntityAttributeValue(stateObj: HassEntity, attribute: string, value?: any): string;
    formatEntityAttributeName(stateObj: HassEntity, attribute: string): string;
}
