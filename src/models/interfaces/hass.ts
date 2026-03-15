import {
	Auth,
	Connection,
	HassConfig,
	HassEntities,
	HassEntity,
	HassServices,
	MessageBase,
} from 'home-assistant-js-websocket';
import {
	AreaRegistryEntry,
	DeviceRegistryEntry,
	EntityRegistryDisplayEntry,
	FloorRegistryEntry,
} from './registries';

export interface HomeAssistant {
	auth: Auth; // & { external?: ExternalMessaging };
	connection: Connection;
	connected: boolean;
	states: HassEntities;
	entities: { [id: string]: EntityRegistryDisplayEntry };
	devices: { [id: string]: DeviceRegistryEntry };
	areas: { [id: string]: AreaRegistryEntry };
	floors: { [id: string]: FloorRegistryEntry };
	services: HassServices;
	config: HassConfig;
	// themes: Themes;
	// selectedTheme: ThemeSettings | null;
	// panels: Panels;
	panelUrl: string;
	// i18n
	// current effective language in that order:
	//   - backend saved user selected language
	//   - language in local app storage
	//   - browser language
	//   - english (en)
	language: string;
	// local stored language, keep that name for backward compatibility
	selectedLanguage: string | null;
	locale: FrontendLocaleData;
	// resources: Resources;
	// localize: LocalizeFunc;
	// translationMetadata: TranslationMetadata;
	suspendWhenHidden: boolean;
	enableShortcuts: boolean;
	vibrate: boolean;
	debugConnection: boolean;
	dockedSidebar: 'docked' | 'always_hidden' | 'auto';
	defaultPanel: string;
	moreInfoEntityId: string | null;
	// user?: CurrentUser;
	// userData?: CoreFrontendUserData | null;
	// hassUrl(path?): string;
	// callService(
	// 	domain: ServiceCallRequest['domain'],
	// 	service: ServiceCallRequest['service'],
	// 	serviceData?: ServiceCallRequest['serviceData'],
	// 	target?: ServiceCallRequest['target'],
	// 	notifyOnError?: boolean,
	// 	returnResponse?: boolean,
	// ): Promise<ServiceCallResponse>;
	callApi<T>(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE',
		path: string,
		parameters?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T>;
	fetchWithAuth(path: string, init?: Record<string, any>): Promise<Response>;
	sendWS(msg: MessageBase): void;
	callWS<T>(msg: MessageBase): Promise<T>;
	// loadBackendTranslation(
	// 	category: Parameters<typeof getHassTranslations>[2],
	// 	integrations?: Parameters<typeof getHassTranslations>[3],
	// 	configFlow?: Parameters<typeof getHassTranslations>[4],
	// ): Promise<LocalizeFunc>;
	// loadFragmentTranslation(
	// 	fragment: string,
	// ): Promise<LocalizeFunc | undefined>;
	formatEntityState(stateObj: HassEntity, state?: string): string;
	formatEntityAttributeValue(
		stateObj: HassEntity,
		attribute: string,
		value?: any,
	): string;
	formatEntityAttributeName(stateObj: HassEntity, attribute: string): string;
}

export interface HassElement extends HTMLElement {
	hass: HomeAssistant;
}

interface FrontendLocaleData {
	language: string;
	number_format: NumberFormat;
	time_format: TimeFormat;
	date_format: DateFormat;
	first_weekday: FirstWeekday;
	time_zone: TimeZone;
}

export enum NumberFormat {
	language = 'language',
	system = 'system',
	comma_decimal = 'comma_decimal',
	decimal_comma = 'decimal_comma',
	quote_decimal = 'quote_decimal',
	space_comma = 'space_comma',
	none = 'none',
}

export enum TimeFormat {
	language = 'language',
	system = 'system',
	am_pm = '12',
	twenty_four = '24',
}

export enum TimeZone {
	local = 'local',
	server = 'server',
}

export enum DateFormat {
	language = 'language',
	system = 'system',
	DMY = 'DMY',
	MDY = 'MDY',
	YMD = 'YMD',
}

export enum FirstWeekday {
	language = 'language',
	monday = 'monday',
	tuesday = 'tuesday',
	wednesday = 'wednesday',
	thursday = 'thursday',
	friday = 'friday',
	saturday = 'saturday',
	sunday = 'sunday',
}
