# ha-nunjucks

[![License][license-shield]](LICENSE.md)
![Project Maintenance][maintenance-shield]
[![GitHub Activity][last-commit-shield]][commits]
[![Community Forum][forum-shield]][forum]

[![Github][github]][github]

A simple wrapper for [nunjucks](https://www.npmjs.com/package/nunjucks) for use with Home Assistant frontend custom components to render [templates](https://www.home-assistant.io/docs/configuration/templating/) instanteneously at HTML render time. This repository offers an easy way for developers to add templating support to Home Assistant custom cards.

## What is nunjucks?

[Nunjucks](https://mozilla.github.io/nunjucks/) is a templating engine for JavaScript that is heavily inspired by jinja2. Home Assistant uses jinja2 to process templates in card configurations on the backend, so the syntax of jinja2 and Nunjucks is virtually the same. This makes it an excellent alternative for Home Assistant templating for custom cards.

While some Home Assistant native cards support templating for certain fields, implementing proper Home Assistant jinja2 template support in custom cards can be difficult. Additionally Home Assistant jinja2 templates are processed by the Python backend, and can take several seconds to render. Nunjucks templates are processed by the frontend using the frontend [hass](https://developers.home-assistant.io/docs/frontend/data/) object before your custom card's HTML is rendered, making nunjucks templating instanteous and much faster than traditional jinja2 templates.

## Usage

Install using npm:

```shell
npm install ha-nunjucks
```

Then import `renderTemplate` from `ha-nunjucks` and provide it with the `hass` object and a template string you want to process.

```typescript
import { renderTemplate } from 'ha-nunjucks';

const renderedString = renderTemplate(this.hass, templateString);
```

Rather than rendering templates on the backend, nunjucks renders templates on the frontend. This repository uses the Home Assistant object present in all custom cards to read entity state data.

You can also provide additional context to the `renderTemplate` function to pass to nunjucks if you want to make additional variables or project specific functions available to your users for use in templates.

```typescript
import { renderTemplate } from 'ha-nunjucks';

const context = {
  foo: 'bar',
  doThing(thing: string) {
    return `doing ${thing}!`;
  },
};

const renderedString = renderTemplate(this.hass, templateString, context);
```

### Return Types

`renderTemplate` will return a string unless the result is `true` or `false` (_not_ case sensitive), in which case it will return a boolean.

When the return type is expected to be a number, end users should cast these values using the nunjucks `int` or `float` filters to prevent undesired behavior caused by JavaScript forcing operations between disparate variable types. Numbers are not returned by default to prevent leading and trailing zeroes from being truncated from numerical strings.

`renderTemplate` will return an empty string for strings that may have been cast from nullish non-numerical values, such as `undefined`, `null`, and `None` (case sensitive).

## Available Extensions

The catch to this approach of rendering jinja2/nunjucks templates is that we have to reimplement all of the [Home Assistant template extension](https://www.home-assistant.io/docs/configuration/templating/#home-assistant-template-extensions) functions. If there are functions that you use that are not currently supported, please make a feature request or try adding it to the project yourself and create a pull request.

So far a subset of the Home Assistant template extension functions have been implemented as documented below.

**NOTE**: The following implemented functions cannot be used as filters.

### Variables

These variables just remap Python built-in constants to JavaScript ones.

| Python | JavaScript |
| ------ | ---------- |
| True   | true       |
| False  | false      |
| None   | null       |

### [Frontend Data Hass Object](https://developers.home-assistant.io/docs/frontend/data/)

The frontend data `hass` object has been exposed to users to call upon.

Because entity IDs contain periods in them, it's better to access it using bracket notation like so:

`{{ hass["states"]["light.sunroom_ceiling"]["state"] }}`

You can also use dot notation for everything but the entity ID.

`{{ hass.states["light.sunroom_ceiling"].state }}`

### [States](https://www.home-assistant.io/docs/configuration/templating/#states)

Functions used to determine an entity's state or an attribute.

| Name          | Arguments                                           | Description                                                                                                         |
| ------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| states        | entity_id, rounded (optional), with_unit (optional) | Returns the state string of the given entity. Optionally round numerical states and append the unit of measurement. |
| is_state      | entity_id, value                                    | Compares an entity's state with a specified state or list of states and returns `true` or `false`.                  |
| state_attr    | entity_id, attribute                                | Returns the value of the attribute or `undefined` if it doesn't exist.                                              |
| is_state_attr | entity_id, attribute, value                         | Tests if the given entity attribute is the specified value.                                                         |
| has_value     | entity_id                                           | Tests if the given entity is not unknown or unavailable.                                                            |

### [State Translated](https://www.home-assistant.io/docs/configuration/templating/#state-translated)

| Name                  | Arguments                                             | Description                                                                                                                                                          |
| --------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| state_translated      | entity_id, state (optional)                           | Returns the formatted and translated state of an entity or provided state using a language that is currently configured in the general settings.                     |
| attr_name_translated  | entity_id, attr_name (optional) attr_value (optional) | Returns the formatted and translated attribute name of an entity or provided attribute name using a language that is currently configured in the general settings.   |
| attr_value_translated | entity_id, attr_name (optional) attr_value (optional) | Returns the formatted and translated attribute value of an entity or provided attribute value using a language that is currently configured in the general settings. |

### [Entities](https://www.home-assistant.io/docs/configuration/templating/#entities)

| Name             | Arguments | Description                                |
| ---------------- | --------- | ------------------------------------------ |
| is_hidden_entity | entity_id | Returns whether an entity has been hidden. |

### [Devices](https://www.home-assistant.io/docs/configuration/templating/#devices)

| Name            | Arguments                                  | Description                                                                                  |
| --------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| device_entities | device_id                                  | Returns a list of entities that are associated with a given device ID.                       |
| device_attr     | device_or_entity_id, attr_name             | Returns the value of attr_name for the given device or entity ID.                            |
| is_device_attr  | device_or_entity_id, attr_name, attr_value | Returns whether the value of attr_name for the given device or entity ID matches attr_value. |
| device_id       | entity_id                                  | Returns the device ID for a given entity ID or device name.                                  |

### [Floors](https://www.home-assistant.io/docs/configuration/templating/#floors)

| Name        | Arguments    | Description                                                                   |
| ----------- | ------------ | ----------------------------------------------------------------------------- |
| floors      |              | Returns the full list of floor IDs that include an area.                      |
| floor_id    | lookup_value | Returns the floor ID for a given device ID, entity ID, area ID, or area name. |
| floor_areas | floor_id     | Returns the list of area IDs tied to a given floor ID.                        |

### [Areas](https://www.home-assistant.io/docs/configuration/templating/#areas)

| Name          | Arguments       | Description                                                         |
| ------------- | --------------- | ------------------------------------------------------------------- |
| areas         |                 | Returns the full list of area IDs.                                  |
| area_id       | lookup_value    | Returns the area ID for a given device ID, entity ID, or area name. |
| area_name     | lookup_value    | Returns the area name for a given device ID, entity ID, or area ID. |
| area_entities | area_name_or_id | Returns the list of entity IDs tied to a given area ID or name.     |
| area_devices  | area_name_or_id | Returns the list of device IDs tied to a given area ID or name.     |

### [Entities For An Integration](https://www.home-assistant.io/docs/configuration/templating/#entities-for-an-integration)

| Name                 | Arguments   | Description                                                              |
| -------------------- | ----------- | ------------------------------------------------------------------------ |
| integration_entities | integration | Returns a list of entities that are associated with a given integration. |

### [Labels](https://www.home-assistant.io/docs/configuration/templating/#labels)

| Name           | Arguments               | Description                                                                                |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| labels         | lookup_value (optional) | Returns the full list of label IDs, or those for a given area ID, device ID, or entity ID. |
| label_areas    | label_id                | Returns the list of area IDs tied to a given label ID.                                     |
| label_devices  | label_id                | Returns the list of device IDs tied to a given label ID.                                   |
| label_entities | label_id                | Returns the list of entity IDs tied to a given label ID.                                   |

### [Immediate If](https://www.home-assistant.io/docs/configuration/templating/#immediate-if-iif)

A shorthand for an if else statement.

| Name | Arguments                             | Description                                                                                                                                                                                                                                                          |
| ---- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iif  | condition, if_true, if_false, if_none | Immediate if. Returns the value of `if_true` if the condition is true, the value of `if_false` if it's false, and the value of `if_none` if it's `undefined`, `null`, or an empty string. All arguments except `condition` are optional. Cannot be used as a filter. |

### [Time](https://www.home-assistant.io/docs/configuration/templating/#time)

| Name         | Arguments                                                                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dt           |                                                                                                                                               | The [py-datetime](https://github.com/tstriker/py-datetime) object for more advanced usage.                                                                                                                                                                                                                                                                                                         |
| now          |                                                                                                                                               | Returns a datetime object that represents the current time in your time zone.                                                                                                                                                                                                                                                                                                                      |
| utcnow       |                                                                                                                                               | Returns a datetime object of the current time in the UTC timezone.                                                                                                                                                                                                                                                                                                                                 |
| today_at     | value                                                                                                                                         | Converts a string containing a military time format to a datetime object with today’s date in your time zone. Defaults to midnight (00:00).                                                                                                                                                                                                                                                        |
| as_datetime  | value, fallback (optional)                                                                                                                    | Converts a string containing a timestamp, or valid UNIX timestamp, to a datetime object. If that fails, it returns the fallback value or, if omitted, raises an error. When the input is already a datetime object it will be returned as is. in case the input is a datetime.date object, midnight will be added as time.                                                                         |
| as_timestamp | value, fallback (optional)                                                                                                                    | converts a datetime object or string to UNIX timestamp. If that fails, returns the fallback value, or if omitted raises an error.                                                                                                                                                                                                                                                                  |
| strptime     | value, format, fallback (optional)                                                                                                            | Parses a string based on a [format](https://docs.python.org/3.10/library/datetime.html#strftime-and-strptime-behavior) and returns a datetime object. If that fails, it returns the default value or, if omitted, raises an error.                                                                                                                                                                 |
| time_since   | value, precision (default 1)                                                                                                                  | Returns a human readable string indicating the difference between now and an input past datetime object. `precision` indicates how many units (years, months, days, hours, minutes, seconds) to use, with the last unit being rounded and 0 being the same as 6. If the input datetime is in the past it returns the input. If the input datetime is not a datetime object it returns nothing.     |
| timedelta    | days (optional), seconds (optional), microseconds (optional), milliseconds (optional), minutes (optional), hours (optional), weeks (optional) | Returns a human readable string indicating the difference between now and an input future datetime object. `precision` indicates how many units (years, months, days, hours, minutes, seconds) to use, with the last unit being rounded and 0 being the same as 6. If the input datetime is in the future it returns the input. If the input datetime is not a datetime object it returns nothing. |

### Other

Functions that are not from the Home Assistant templating documentation

| Name        | Arguments  | Description                                                                                                                                           |
| ----------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| match_media | mediaquery | Returns the boolean result of the provided [CSS media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). |

[last-commit-shield]: https://img.shields.io/github/last-commit/Nerwyn/ha-nunjucks?style=for-the-badge
[commits]: https://github.com/Nerwyn/ha-nunjucks/commits/main
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/t/an-easy-way-to-add-templating-support-to-your-custom-front-end-projects/651621
[license-shield]: https://img.shields.io/github/license/Nerwyn/ha-nunjucks.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Nerwyn-blue.svg?style=for-the-badge
[github]: https://img.shields.io/github/followers/Nerwyn.svg?style=social
