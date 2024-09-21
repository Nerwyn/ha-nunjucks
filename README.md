# ha-nunjucks

[![License][license-shield]](LICENSE.md)
![Project Maintenance][maintenance-shield]
[![GitHub Activity][last-commit-shield]][commits]
[![Community Forum][forum-shield]][forum]

[![Github][github]][github]

A wrapper for [nunjucks](https://www.npmjs.com/package/nunjucks) for use with Home Assistant frontend custom components to render [templates](https://www.home-assistant.io/docs/configuration/templating/) instanteneously at HTML render time. This repository offers an easy way for developers to add templating support to Home Assistant custom cards.

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

The vast majority of the [Home Assistant template extensions](https://www.home-assistant.io/docs/configuration/templating/#home-assistant-template-extensions) have been implemented into this package. If there are functions that you use that are not currently supported or don't behave exactly like their jinja2 versions, please make a feature request or try adding it to the project yourself and create a pull request.

Template extensions can be functions, tests, filters, or constants. Functions are called inline like a regular programming function, such as `states()` or `floors()`. Filters are added to the end of a string using a pipe (`|`) character. Many filters are also available as functions. Tests are functions which return booleans and can be used in an if statement like `if foo has_value`, not to be confused with functions with is in their names that also return booleans and used in if statements like `if is_state`. Contants are static values, and are just called as is like `{{ True }}` or `{{ pi }}`.

### Python Constants

These just remap Python built-in constants to JavaScript ones.

| Python | JavaScript |
| ------ | ---------- |
| True   | true       |
| False  | false      |
| None   | null       |

### [Frontend Data Hass Object](https://developers.home-assistant.io/docs/frontend/data/)

The frontend data `hass` object has been exposed to users to call upon.

Because entity IDs contain periods in them, you cannot use dot notation when accessing an entity's state object using it. You have to use bracket notation like so:

`{{ hass.states["light.sunroom_ceiling"].state }}`

For convenience, the `hass states` object is rebuilt as a separate object that can be accessed with dot notation. Because of JavaScript limitations, it's name has been changed to `_states`.

`{{ _states.light.sunroom_ceiling.state }}`

### [States](https://www.home-assistant.io/docs/configuration/templating/#states)

Functions used to determine an entity's state or an attribute.

| Name          | Type             | Arguments                                           | Description                                                                                                         |
| ------------- | ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| states        | function         | entity_id, rounded (optional), with_unit (optional) | Returns the state string of the given entity. Optionally round numerical states and append the unit of measurement. |
| is_state      | function         | entity_id, value                                    | Compares an entity's state with a specified state or list of states and returns `true` or `false`.                  |
| state_attr    | function         | entity_id, attribute                                | Returns the value of the attribute or `undefined` if it doesn't exist.                                              |
| is_state_attr | function         | entity_id, attribute, value                         | Tests if the given entity attribute is the specified value.                                                         |
| has_value     | function, filter | entity_id                                           | Tests if the given entity is not unknown or unavailable.                                                            |

### [State Translated](https://www.home-assistant.io/docs/configuration/templating/#state-translated)

| Name                  | Type     | Arguments                                             | Description                                                                                                                                                          |
| --------------------- | -------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| state_translated      | function | entity_id, state (optional)                           | Returns the formatted and translated state of an entity or provided state using a language that is currently configured in the general settings.                     |
| attr_name_translated  | function | entity_id, attr_name (optional) attr_value (optional) | Returns the formatted and translated attribute name of an entity or provided attribute name using a language that is currently configured in the general settings.   |
| attr_value_translated | function | entity_id, attr_name (optional) attr_value (optional) | Returns the formatted and translated attribute value of an entity or provided attribute value using a language that is currently configured in the general settings. |

### [Groups](https://www.home-assistant.io/docs/configuration/templating/#working-with-groups)

| Name   | Type             | Arguments | Description                                                                                       |
| ------ | ---------------- | --------- | ------------------------------------------------------------------------------------------------- |
| expand | function, filter | args      | Retrieve state objects for provided entities and sort. Expands group entities into their members. |

### [Entities](https://www.home-assistant.io/docs/configuration/templating/#entities)

| Name             | Type     | Arguments | Description                                |
| ---------------- | -------- | --------- | ------------------------------------------ |
| is_hidden_entity | function | entity_id | Returns whether an entity has been hidden. |

### [Devices](https://www.home-assistant.io/docs/configuration/templating/#devices)

| Name            | Type             | Arguments                                  | Description                                                                                  |
| --------------- | ---------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| device_entities | function, filter | device_id                                  | Returns a list of entities that are associated with a given device ID.                       |
| device_attr     | function, filter | device_or_entity_id, attr_name             | Returns the value of attr_name for the given device or entity ID.                            |
| is_device_attr  | function         | device_or_entity_id, attr_name, attr_value | Returns whether the value of attr_name for the given device or entity ID matches attr_value. |
| device_id       | function, filter | entity_id                                  | Returns the device ID for a given entity ID or device name.                                  |

### [Floors](https://www.home-assistant.io/docs/configuration/templating/#floors)

| Name        | Type             | Arguments    | Description                                                                   |
| ----------- | ---------------- | ------------ | ----------------------------------------------------------------------------- |
| floors      | function         |              | Returns the full list of floor IDs that include an area.                      |
| floor_id    | function, filter | lookup_value | Returns the floor ID for a given device ID, entity ID, area ID, or area name. |
| floor_areas | function, filter | floor_id     | Returns the list of area IDs tied to a given floor ID.                        |

### [Areas](https://www.home-assistant.io/docs/configuration/templating/#areas)

| Name          | Type             | Arguments       | Description                                                         |
| ------------- | ---------------- | --------------- | ------------------------------------------------------------------- |
| areas         | function         |                 | Returns the full list of area IDs.                                  |
| area_id       | function, filter | lookup_value    | Returns the area ID for a given device ID, entity ID, or area name. |
| area_name     | function, filter | lookup_value    | Returns the area name for a given device ID, entity ID, or area ID. |
| area_entities | function, filter | area_name_or_id | Returns the list of entity IDs tied to a given area ID or name.     |
| area_devices  | function, filter | area_name_or_id | Returns the list of device IDs tied to a given area ID or name.     |

### [Entities For An Integration](https://www.home-assistant.io/docs/configuration/templating/#entities-for-an-integration)

| Name                 | Type     | Arguments   | Description                                                              |
| -------------------- | -------- | ----------- | ------------------------------------------------------------------------ |
| integration_entities | function | integration | Returns a list of entities that are associated with a given integration. |

### [Labels](https://www.home-assistant.io/docs/configuration/templating/#labels)

| Name           | Type             | Arguments               | Description                                                                                |
| -------------- | ---------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| labels         | function, filter | lookup_value (optional) | Returns the full list of label IDs, or those for a given area ID, device ID, or entity ID. |
| label_areas    | function, filter | label_id                | Returns the list of area IDs tied to a given label ID.                                     |
| label_devices  | function, filter | label_id                | Returns the list of device IDs tied to a given label ID.                                   |
| label_entities | function, filter | label_id                | Returns the list of entity IDs tied to a given label ID.                                   |

### [Immediate If](https://www.home-assistant.io/docs/configuration/templating/#immediate-if-iif)

A shorthand for an if else statement.

| Name | Type             | Arguments                             | Description                                                                                                                                                                                                                                                          |
| ---- | ---------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iif  | function, filter | condition, if_true, if_false, if_none | Immediate if. Returns the value of `if_true` if the condition is true, the value of `if_false` if it's false, and the value of `if_none` if it's `undefined`, `null`, or an empty string. All arguments except `condition` are optional. Cannot be used as a filter. |

### [Time](https://www.home-assistant.io/docs/configuration/templating/#time)

**NOTE**: JS Date limitations

- JS Date does not support time precision below 1 millisecond, while Python datetime supports microsecond precision. While some of these functions allow you to input microseconds, any time unit below 1 millisecond will be lost.
- JS Date is not as good at handling timezones as Python datetime. Be careful about timezone differences! You can try to account for this using the `utc` flags and/or by including a timezone offset in a datetime string to parse using `as_datetime` or `strptime`.

| Name             | Type             | Arguments                                                                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| now              | function         |                                                                                                                                               | Returns a datetime object that represents the current time in your time zone.                                                                                                                                                                                                                                                                                                                      |
| utcnow           | function         |                                                                                                                                               | Returns a datetime object of the current time in the UTC timezone.                                                                                                                                                                                                                                                                                                                                 |
| today_at         | function, filter | value                                                                                                                                         | Converts a string containing a military time format to a datetime object with today’s date in your time zone. Defaults to midnight (00:00).                                                                                                                                                                                                                                                        |
| as_datetime      | function, filter | value, fallback (optional), utc (default true)                                                                                                | Converts a string containing a timestamp, or valid UNIX timestamp, to a datetime object. If that fails, it returns the fallback value or, if omitted, raises an error. When the input is already a datetime object it will be returned as is. in case the input is a datetime.date object, midnight will be added as time.                                                                         |
| as_timestamp     | function, filter | value, fallback (optional)                                                                                                                    | Converts a datetime object or string to UNIX timestamp. If that fails, returns the fallback value, or if omitted raises an error.                                                                                                                                                                                                                                                                  |
| as_local         | function, filter | value                                                                                                                                         | Converts a datetime object to local time.                                                                                                                                                                                                                                                                                                                                                          |
| strptime         | function         | value, format, fallback (optional), utc (default false)                                                                                       | Parses a string based on a [format](https://docs.python.org/3.10/library/datetime.html#strftime-and-strptime-behavior) and returns a datetime object. If that fails, it returns the default value or, if omitted, raises an error.                                                                                                                                                                 |
| time_since       | function, filter | value, precision (default 1)                                                                                                                  | Returns a human readable string indicating the difference between now and an input past datetime object. `precision` indicates how many units (years, months, days, hours, minutes, seconds) to use, with the last unit being rounded and 0 being the same as 6. If the input datetime is in the past it returns the input. If the input datetime is not a datetime object it returns nothing.     |
| time_until       | function, filter | value, precision (default 1)                                                                                                                  | Returns a human readable string indicating the difference between now and an input future datetime object. `precision` indicates how many units (years, months, days, hours, minutes, seconds) to use, with the last unit being rounded and 0 being the same as 6. If the input datetime is in the future it returns the input. If the input datetime is not a datetime object it returns nothing. |
| timedelta        | function         | days (optional), seconds (optional), microseconds (optional), milliseconds (optional), minutes (optional), hours (optional), weeks (optional) | Returns a timedelta object, which represents a duration (an amount of time between two datetimes). It accepts the same arguments as the Python datetime.timedelta function – days, seconds, microseconds, milliseconds, minutes, hours, weeks. JS Date does not support microsecond precision, and precision below 1 millisecond is lost.                                                          |
| as_timedelta     | function, filter | value                                                                                                                                         | Converts a string to a timedelta object. Expects data in the format `DD HH:MM:SS.uuuuuu`, `DD HH:MM:SS,uuuuuu`, or as specified by ISO 8601 (e.g. `P4DT1H15M20S` which is equivalent to `4 1:15:20`) or PostgreSQL’s day-time interval format (e.g. `3 days 04:05:06`).                                                                                                                            |
| timestamp_local  | filter           | value, fallback (optional)                                                                                                                    | Converts a UNIX timestamp to the ISO format string representation as date/time in your local timezone. If that fails, returns the `fallback` value, or if omitted raises an error.                                                                                                                                                                                                                 |
| timestamp_utc    | filter           | value, fallback (optional)                                                                                                                    | Converts a UNIX timestamp to the ISO format string representation as date/time in UTC timezone. If that fails, returns the `fallback` value, or if omitted raises an error.                                                                                                                                                                                                                        |
| timestamp_custom | filter           | value, format, local (default true), fallback (optional)                                                                                      | Converts a UNIX timestamp to its string representation based on a custom format. Uses the local timezone by default. If that fails, returns the `fallback` value, or if omitted raises an error.                                                                                                                                                                                                   |

### [To/From JSON](https://www.home-assistant.io/docs/configuration/templating/#tofrom-json)

| Name      | Type   | Arguments                                  | Description                                                                                                                                                                                                                                                                             |
| --------- | ------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| to_json   | filter | obj, ensure_ascii, pretty_print, sort_keys | Turn an object into a JSON string. `ensure_ascii` converts unicode characters into escape sequences. `pretty_print` formats the output with new lines and an indent of two spaces. `sort_keys` sorts the keys of the JSON object. **Consider using the nunjucks `dump` filter instead** |
| from_json | filter | value                                      | Parse a string as JSON.                                                                                                                                                                                                                                                                 |

### [Distance](https://www.home-assistant.io/docs/configuration/templating/#distance)

| Name     | Type             | Arguments | Description                                                                                                                                                                                                   |
| -------- | ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| distance | function         | args      | Measures the distance between home, an entity, or coordinates. The unit of measurement (kilometers or miles) depends on the system’s configuration settings. Does not work with groups.                       |
| closest  | function, filter | args      | Finds the closest entity to home, or the first entity or coordinate if multiple provided. Arguments can be entity IDs, domains, entity state objects, coordinate pairs, or arrays. Does not work with groups. |

### [Contains](https://www.home-assistant.io/docs/configuration/templating/#contains)

| Name     | Type         | Arguments   | Description                         |
| -------- | ------------ | ----------- | ----------------------------------- |
| contains | filter, test | list, value | Returns if an element is in a list. |

### [Numeric](https://www.home-assistant.io/docs/configuration/templating/#numeric-functions-and-filters)

| Name             | Type             | Arguments                                     | Description                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ---------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| float            | function, filter | value, fallback (optional)                    | Converts a value to a float. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                                                                                               |
| is_number        | function, filter | value                                         | Returns true if a value can be parsed as a number.                                                                                                                                                                                                                                                                                                       |
| int              | function, filter | value, fallback (optional)                    | Converts a value to an integer. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                                                                                            |
| bool             | function, filter | value, fallback (optional )                   | Converts a value to a boolean based on the human readable truthiness of it, case insensitive. Non-zero integers, `true`, `yes`, `on`, `enable`, and `1` return true. 0, `false`, `no`, `off`, `disable` and `0` return false. If the value's human readable truthiness cannot be determined, returns the fallback value or, if omitted, raises an error. |
| log              | function, filter | value, base (default e), fallback (optional)  | Returns the logarithm of a value, defaulting to the natural logarithm if no base is provided. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                              |
| sin              | function, filter | value, fallback (optional)                    | Returns the sine of a value. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                                                                                               |
| cos              | function, filter | value, fallback (optional)                    | Returns the cosine of a value. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                                                                                             |
| tan              | function, filter | value, fallback (optional)                    | Returns the tangent of a value. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                                                                                            |
| asin             | function, filter | value, fallback (optional)                    | Returns the arcus sine of a value. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                                                                                         |
| acos             | function, filter | value, fallback (optional)                    | Returns the arcus cosine of a value. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                                                                                       |
| atan             | function, filter | value, fallback (optional)                    | Returns the arcus tangent of a value. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                                                                                      |
| atan2            | function, filter | y, x, fallback (optional)                     | Returns the four quadrant arcus tangent of y / x. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                                                                          |
| sqrt             | function, filter | value, fallback (optional)                    | Returns the square root of a value. If that fails, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                                                                                        |
| max              | function, filter | args                                          | Returns the largest argument provided, flattening any arrays.                                                                                                                                                                                                                                                                                            |
| min              | function, filter | args                                          | Returns the smallest argument provided, flattening any arrays.                                                                                                                                                                                                                                                                                           |
| average          | function, filter | values, fallback (optional)                   | Returns the average of an array, flattening any subarrays. If a non-numeric value is detected or the array is empty, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                      |
| median           | function, filter | values, fallback (optional)                   | Returns the median of an array, flattening any subarrays. If a non-numeric value is detected or the array is empty, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                       |
| statistical_mode | function, filter | values, fallback (optional)                   | Returns the mode of an array, flattening any subarrays. If a non-numeric value is detected or the array is empty, it returns the fallback value or, if omitted, raises an error.                                                                                                                                                                         |
| e                | constant         |                                               | Mathematical constant Euler's number.                                                                                                                                                                                                                                                                                                                    |
| pi               | constant         |                                               | Mathematical constant pi.                                                                                                                                                                                                                                                                                                                                |
| tau              | constant         |                                               | Mathematical constant tau.                                                                                                                                                                                                                                                                                                                               |
| inf              | constant         |                                               | Mathematical conceptual value infinity.                                                                                                                                                                                                                                                                                                                  |
| round            | filter           | value, precision, method, fallback (optional) | Converts the input to a number and rounds it to `precision` decimals. It has four modes - `even`, `floor`, `ceil`, and `half`. If the input value is not a number, it returns the fallback value, or, if omitted, raises an error.                                                                                                                       |
| bitwise_and      | filter           | value_one, value_two                          | Performs a bitwise and(&) operation with two values.                                                                                                                                                                                                                                                                                                     |
| bitwise_or       | filter           | value_one, value_two                          | Performs a bitwise or(\|) operation with two values.                                                                                                                                                                                                                                                                                                     |
| bitwise_xor      | filter           | value_one, value_two                          | Performs a bitwise xor(^) operation with two values.                                                                                                                                                                                                                                                                                                     |
| ord              | filter           | value                                         | Returns an integer representing a character's (string of length one) Unicode code point when the argument is a Unicode object, or the value of the byte when the argument is an 8-bit string.                                                                                                                                                            |
| multiply         | filter           | value, arg                                    | Converts the input to a number and multiplies it by the argument.                                                                                                                                                                                                                                                                                        |
| add              | filter           | value, arg                                    | Converts the input to a number and adds it to the argument.                                                                                                                                                                                                                                                                                              |

### [Complex Type Checking](https://www.home-assistant.io/docs/configuration/templating/#complex-type-checking)

| Name        | Type | Arguments                                                | Description                       |
| ----------- | ---- | -------------------------------------------------------- | --------------------------------- |
| list        | test | value                                                    | Tests if a value is a list/array. |
| set         | test | value                                                    | Tests if a value is a set.        |
| datetime    | test | value                                                    | Tests if a value is a datetime.   |
| string_like | test | value Tests if a value is a string, bytes, or bytearray. |

### [Type Conversions](https://www.home-assistant.io/docs/configuration/templating/#type-conversions)

| Name | Type     | Arguments | Description                                            |
| ---- | -------- | --------- | ------------------------------------------------------ |
| set  | function | args      | Convert a list/array to a set. Removes duplicates.     |
| list | function | args      | Convert a set to an array. Does not remove duplicates. |

### [Iterating Multiple Objects](https://www.home-assistant.io/docs/configuration/templating/#iterating-multiple-objects)

| Name | Type     | Arguments | Description                                                                                                                        |
| ---- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| zip  | function | args      | Use to iterate over multiple collections in one operation. If given one array will perform the opposite action and unzip the list. |

### [Functions and Filters to Process Raw Data](https://www.home-assistant.io/docs/configuration/templating/#functions-and-filters-to-process-raw-data)

| Name   | Type             | Arguments                         | Description                                                                                                                                                                                                             |
| ------ | ---------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pack   | filter           | value, format                     | Converts a native type to a bytes type object. Returns nothing on error.                                                                                                                                                |
| unpack | function, filter | value, format, offset (default 0) | Converts a bytes object into a native type. The offset parameter determines the offset position in bytes from the start of the input bytes based buffer. Returns nothing on error. Only returns the first bytes object. |

### [Strings] (https://www.home-assistant.io/docs/configuration/templating/#string-filters)

| Name          | Type   | Arguments                         | Description                                                                            |
| ------------- | ------ | --------------------------------- | -------------------------------------------------------------------------------------- |
| urlencode     | filter | value                             | Converts an object to a percent-encoded ASCII text string.                             |
| slugify       | filter | value, separator ( default -)     | Converts a given string into a "slug".                                                 |
| ordinal       | filter | value                             | Converts an integer into a number defining a position in a series.                     |
| base64_decode | filter | value, encoding (default 'utf-8') | Decodes a base 64 string to a string. Encoding can be `utf-8`, `ascii`, or `raw/None`. |

### [Regular Expressions] (https://www.home-assistant.io/docs/configuration/templating/#regular-expressions)

| Name                | Type   | Arguments                                                                  | Description                                                                              |
| ------------------- | ------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| match               | test   | value, find, ignorecase (default false)                                    | Matches the find expression at the beginning of the string using regex.                  |
| search              | test   | value, find, ignorecase (default false)                                    | Matches the find expression anywhere in the string using regex.                          |
| regex_replace       | filter | value, find (default ''), replace (default ''), ignorecase (default false) | Replaces the find expression with the replace expression string using RegEx.             |
| regex_findall       | filter | value, find (default ''), ignorecase (default false)                       | Finds all RegEx matches of the find expression in value and returns an array of matches. |
| regex_findall_index | filter | value, find (default ''), index (default 0), ignorecase(default false)     | Performs a RegEx find all but returns the match at a provided index.                     |

### Miscellaneous

Functions that are not from the Home Assistant templating documentation

| Name        | Arguments  | Description                                                                                                                                           |
| ----------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| match_media | mediaquery | Returns the boolean result of the provided [CSS media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). |
| str         | value      | Return the string representation of the input.                                                                                                        |

[last-commit-shield]: https://img.shields.io/github/last-commit/Nerwyn/ha-nunjucks?style=for-the-badge
[commits]: https://github.com/Nerwyn/ha-nunjucks/commits/main
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/t/an-easy-way-to-add-templating-support-to-your-custom-front-end-projects/651621
[license-shield]: https://img.shields.io/github/license/Nerwyn/ha-nunjucks.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Nerwyn-blue.svg?style=for-the-badge
[github]: https://img.shields.io/github/followers/Nerwyn.svg?style=social
