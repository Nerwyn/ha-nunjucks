import { DateFormat, NumberFormat, TimeFormat, TimeZone, } from '../models/interfaces/hass';
export function state_translated(hass, entity_id, state) {
    try {
        return hass.formatEntityState(hass.states[entity_id], state);
    }
    catch {
        return state ?? hass.states[entity_id]?.state ?? undefined;
    }
}
export function attr_name_translated(hass, entity_id, attr_name) {
    try {
        return hass.formatEntityAttributeName(hass.states[entity_id], attr_name);
    }
    catch {
        return (attr_name ?? hass.states[entity_id]?.attributes?.[attr_name] ?? undefined);
    }
}
export function attr_value_translated(hass, entity_id, attr_name, attr_value) {
    try {
        return hass.formatEntityAttributeValue(hass.states[entity_id], attr_name, attr_value);
    }
    catch {
        return (attr_value ?? hass.states[entity_id]?.attributes?.[attr_name] ?? undefined);
    }
}
export function getNumberFormatter(hass) {
    // https://github.com/home-assistant/frontend/blob/52ac052baf139e94b7ed6891eb0beace7e2f47d3/src/common/number/format_number.ts#L24
    let language;
    switch (hass.locale.number_format) {
        case NumberFormat.comma_decimal:
            language = ['en-US', 'en']; // Use United States with fallback to English formatting 1,234,567.89
            break;
        case NumberFormat.decimal_comma:
            language = ['de', 'es', 'it']; // Use German with fallback to Spanish then Italian formatting 1.234.567,89
            break;
        case NumberFormat.space_comma:
            language = ['fr', 'sv', 'cs']; // Use French with fallback to Swedish and Czech formatting 1 234 567,89
            break;
        case NumberFormat.quote_decimal:
            language = ['de-CH']; // Use German (Switzerland) formatting 1'234'567.89
            break;
        default:
            language = hass.locale.language ?? hass.language;
            break;
    }
    return new Intl.NumberFormat(language);
}
export function number_translated(hass, value, precision) {
    value = Number(value);
    if (isNaN(value)) {
        return value;
    }
    if (precision) {
        return value.toLocaleString(hass.locale.language ?? hass.language, {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
        });
    }
    return window.haNunjucks.numberFormat.format(value);
}
export function date_translated(hass, value) {
    // https://github.com/home-assistant/frontend/blob/52ac052baf139e94b7ed6891eb0beace7e2f47d3/src/common/datetime/format_date.ts#L59
    try {
        let date;
        if (typeof value === 'string') {
            date = new Date(value);
        }
        else if (value instanceof Date) {
            date = value;
        }
        else {
            date = value.jsDate;
        }
        let order;
        switch (hass.locale.date_format) {
            case DateFormat.DMY:
                order = ['day', 'month', 'year'];
                break;
            case DateFormat.MDY:
                order = ['month', 'day', 'year'];
                break;
            case DateFormat.YMD:
                order = ['year', 'month', 'day'];
                break;
            default:
                return window.haNunjucks.dateFormat.format(date);
        }
        const parts = window.haNunjucks.dateFormat.formatToParts(date);
        const partsObj = {
            literal: parts.find((value) => value.type === 'literal')?.value,
            day: parts.find((value) => value.type === 'day')?.value,
            month: parts.find((value) => value.type === 'month')?.value,
            year: parts.find((value) => value.type === 'year')?.value,
        };
        const lastPart = parts[parts.length - 1];
        partsObj.lastLiteral = lastPart?.type === 'literal' ? lastPart?.value : '';
        if (hass.locale.language === 'bg' &&
            hass.locale.date_format === DateFormat.YMD) {
            partsObj.lastLiteral = '';
        }
        return `${partsObj[order[0]]}${partsObj.literal}${partsObj[order[1]]}${partsObj.literal}${partsObj[order[2]]}${partsObj.lastLiteral}`;
    }
    catch {
        return value;
    }
}
function useAmPm(hass) {
    // https://github.com/home-assistant/frontend/blob/52ac052baf139e94b7ed6891eb0beace7e2f47d3/src/common/datetime/use_am_pm.ts
    if (hass.locale.time_format === TimeFormat.language ||
        hass.locale.time_format === TimeFormat.system) {
        const testLanguage = hass.locale.time_format === TimeFormat.language
            ? hass.locale.language
            : undefined;
        const test = new Date('January 1, 2023 22:00:00').toLocaleString(testLanguage);
        return test.includes('10');
    }
    return hass.locale.time_format === TimeFormat.am_pm;
}
function resolveTimeZone(hass) {
    // https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/resolve-time-zone.ts#L9
    const intlTZ = Intl.DateTimeFormat?.().resolvedOptions?.().timeZone;
    const localTZ = intlTZ ?? 'UTC';
    return hass.locale.time_zone === TimeZone.local && intlTZ
        ? localTZ
        : hass.config.time_zone;
}
export function getTimeFormatter(hass) {
    const AMPM = useAmPm(hass);
    const options = {
        hour: AMPM ? 'numeric' : '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: AMPM ? 'h12' : 'h23',
        timeZone: resolveTimeZone(hass),
    };
    return new Intl.DateTimeFormat(hass.locale.language ?? hass.language, options);
}
export function time_translated(value) {
    try {
        let time;
        if (typeof value === 'string') {
            time = new Date(`1970-01-01T${value}`);
        }
        else if (value instanceof Date) {
            time = value;
        }
        else {
            time = value.jsDate;
        }
        return window.haNunjucks.timeFormat.format(time);
    }
    catch {
        return value;
    }
}
export function datetime_translated(hass, value) {
    try {
        let datetime;
        if (typeof value === 'string') {
            datetime = new Date(value);
        }
        else if (value instanceof Date) {
            datetime = value;
        }
        else {
            datetime = value.jsDate;
        }
        return `${date_translated(hass, datetime)} at ${time_translated(datetime)}`;
    }
    catch {
        return value;
    }
}
