# ha-nunjucks

[![License][license-shield]](LICENSE.md)
![Project Maintenance][maintenance-shield]
[![GitHub Activity][last-commit-shield]][commits]
[![Community Forum][forum-shield]][forum]

[![Github][github]][github]

A wrapper for [nunjucks](https://www.npmjs.com/package/nunjucks) for use with Home Assistant frontend custom components to render [templates](https://www.home-assistant.io/docs/configuration/templating/) instanteneously at HTML render time. This repository offers a fast and easy way for developers to add templating support to Home Assistant custom cards.

## What is nunjucks?

[Nunjucks](https://mozilla.github.io/nunjucks/) is a templating engine for JavaScript that is heavily inspired by jinja2. Home Assistant uses jinja2 to process templates in card configurations on the backend, so the syntax of jinja2 and Nunjucks is virtually the same. This makes it an excellent alternative to Home Assistant core jinja2 templating for custom cards.

While some Home Assistant native cards support templating for certain fields, implementing proper Home Assistant jinja2 template support in custom cards can be difficult. Additionally Home Assistant jinja2 templates are processed by the Python backend, and use subscriptions which must be managed and do not play as well with dynamic custom variables. Nunjucks templates are processed by the frontend using the frontend [`hass`](https://developers.home-assistant.io/docs/frontend/data/) object before your custom card's HTML is rendered, making nunjucks templating synchronous, near instanteous, and easier to use than traditional jinja2 templates.

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

That's it! The result of `renderTemplate` is the rendered template for you to use. In unit and integration testing render time is under 1 ms and shouldn't cause any latency in your projects.

Rather than rendering templates on the backend, nunjucks renders templates on the frontend. This repository uses the Home Assistant object present in all custom cards to read entity state data. A single shared Nunjucks environment is used for the frontend across all custom element instances that use Nunjucks, which helps with initial load times.

You can also provide context to the `renderTemplate` function to pass to nunjucks if you want to make additional variables or project specific functions available to your users for use in templates.

```typescript
import { renderTemplate } from 'ha-nunjucks';

const context = {
  foo: 'bar',
  doThing(thing: string) {
    return `doing ${thing}!`;
  },
  config: {
    entity: 'foo.bar',
    attribute: 'baz_bah',
  },
};

const renderedString = renderTemplate(this.hass, templateString, context);
```

`renderTemplate` will try to validate that inputs contain valid templates by default using the exported function `hasTemplate`. You can disable this by setting the fourth argument of `renderTemplate` to `false`. This way you can perform this check yourself before any additional templating setup you perform in your code.

```typescript
import { hasTemplate, renderTemplate } from 'ha-nunjucks';

if (!hasTemplate(templateString)) {
  return templateString;
}

const context = {
  foo: 'bar',
  doThing(thing: string) {
    return `doing ${thing}!`;
  },
  config: {
    entity: 'foo.bar',
    attribute: 'baz_bah',
  },
};

const renderedString = renderTemplate(
  this.hass,
  templateString,
  context,
  false,
);
```

### Return Types

`renderTemplate` will return a string unless the result is `true` or `false` (_not_ case sensitive), in which case it will return a boolean.

When the return type is expected to be a number, end users should cast these values using the nunjucks `int` or `float` filters to prevent undesired behavior caused by JavaScript forcing operations between disparate variable types. Numbers are not returned by default to prevent leading and trailing zeroes from being truncated from numerical strings.

`renderTemplate` will return an empty string for strings that may have been cast from nullish non-numerical values, such as `undefined`, `null`, and `None` (case sensitive).

## Available Extensions

The vast majority of the [Home Assistant template extensions](https://www.home-assistant.io/docs/configuration/templating/#home-assistant-template-extensions) have been implemented into this package. If there are functions that you use that are not currently supported or don't behave exactly like their jinja2 versions, please make a feature request or try adding it to the project yourself and create a pull request.

Template extensions can be functions, tests, filters, and/or constants. Functions are called like a regular programming function, such as `states()` or `floors()`. Filters are added to the end of a string using a pipe character like `123.45 | int` or `"light.lounge" | state_attr("brightness")`. Tests are functions which return booleans and can be used in an if statement like `if "foo" is string_like`, not to be confused with functions that return booleans and can be used in if statements like `if is_state("light.lounge", "on")`. Contants are static values, and are just called as is like `{{ True }}` or `{{ pi }}`.

In addition to the template extensions implemented in this package, you also have access to the nunjucks builtin functions and filters. [Read the nunjucks templating documentation for more information](https://mozilla.github.io/nunjucks/templating.html).

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

For convenience, the `hass.states` object is rebuilt as a separate object that can be accessed with dot notation. Because of JavaScript limitations not allowing for functions and object to share the same name, it has been named `_states`.

`{{ _states.light.sunroom_ceiling.state }}`

You do have to use bracket notation for arrays within state objects.

`{{ _states.light.sunroom_ceiling.attributes.supported_color_modes[0] }}`

### [States](https://www.home-assistant.io/docs/configuration/templating/#states)

Functions used to determine an entity's state or an attribute.

| Name          | Type             | Arguments                                           | Description                                                                                                         |
| ------------- | ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| states        | function, filter | entity_id, rounded (optional), with_unit (optional) | Returns the state string of the given entity. Optionally round numerical states and append the unit of measurement. |
| is_state      | function,        | entity_id, value                                    | Compares an entity's state with a specified state or list of states and returns `true` or `false`.                  |
| state_attr    | function, filter | entity_id, attribute                                | Returns the value of the attribute or `undefined` if it doesn't exist.                                              |
| is_state_attr | function         | entity_id, attribute, value                         | Tests if the given entity attribute is the specified value.                                                         |
| has_value     | function, filter | entity_id                                           | Tests if the given entity is not unknown or unavailable.                                                            |

### [State Translated](https://www.home-assistant.io/docs/configuration/templating/#state-translated)

| Name                  | Type             | Arguments                                   | Description                                                                                                                                                          |
| --------------------- | ---------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| state_translated      | function, filter | entity_id, state (optional)                 | Returns the formatted and translated state of an entity or provided state using a language that is currently configured in the general settings.                     |
| attr_name_translated  | function, filter | entity_id, attr_name                        | Returns the formatted and translated attribute name of an entity using a language that is currently configured in the general settings.                              |
| attr_value_translated | function, filter | entity_id, attr_name, attr_value (optional) | Returns the formatted and translated attribute value of an entity or provided attribute value using a language that is currently configured in the general settings. |
| number_translated     | function, filter | value                                       | Returns the formatted and translated input number using a language that is currently configured in the general settings.                                             |
| date_translated       | function, filter | value                                       | Returns the formatted and translated input date or datetime as a date using a language that is currently configured in the general settings.                         |
| time_translated       | function, filter | value                                       | Returns the formatted and translated input time or datetime as a time using a language that is currently configured in the general settings.                         |
| datetime_translated   | function, filter | value                                       | Returns the formatted and translated input datetime using a language that is currently configured in the general settings.                                           |

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

| Name        | Type             | Arguments        | Description                                                                               |
| ----------- | ---------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| floors      | function         |                  | Returns the full list of floor IDs that include an area.                                  |
| floor_id    | function, filter | lookup_value     | Returns the floor ID for a given device ID, entity ID, area ID, or area name.             |
| floor_name  | function, filter | lookup_value     | Returns the floor name for a given device ID, entity ID, area ID, area name, or floor ID. |
| floor_areas | function, filter | floor_name_or_id | Returns the list of area IDs tied to a given floor ID or name.                            |

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

**NOTE**: Labels are not available in the `hass` object and must be retrieved asynchronously from the Home Assistant backend the first time `ha-nunjucks` is imported. Since this package is otherwise synchronous, this can cause a race condition where no labels are found the first time `renderTemplate` is run. This generally resolves itself once the template re-renders.

| Name           | Type             | Arguments               | Description                                                                                |
| -------------- | ---------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| labels         | function, filter | lookup_value (optional) | Returns the full list of label IDs, or those for a given area ID, device ID, or entity ID. |
| label_id       | function, filter | lookup_value            | Returns the label ID for a given label name.                                               |
| label_name     | function, filter | lookup_value            | Returns the label name for a given label ID.                                               |
| label_areas    | function, filter | label_name_or_id        | Returns the list of area IDs tied to a given label ID or name.                             |
| label_devices  | function, filter | label_name_or_id        | Returns the list of device IDs tied to a given label ID or name.                           |
| label_entities | function, filter | label_name_or_id        | Returns the list of entity IDs tied to a given label ID or name.                           |

### [Immediate If](https://www.home-assistant.io/docs/configuration/templating/#immediate-if-iif)

A shorthand for an if else statement.

| Name | Type             | Arguments                             | Description                                                                                                                                                                                                                                                          |
| ---- | ---------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iif  | function, filter | condition, if_true, if_false, if_none | Immediate if. Returns the value of `if_true` if the condition is true, the value of `if_false` if it's false, and the value of `if_none` if it's `undefined`, `null`, or an empty string. All arguments except `condition` are optional. Cannot be used as a filter. |

### [Time](https://www.home-assistant.io/docs/configuration/templating/#time)

**NOTE**:

- JS Date does not support time precision below 1 millisecond, while Python datetime supports microsecond precision. Microsecond arguments are not available for these methods.
- JS Date is not as good at handling timezones as Python datetime. Be careful about timezone differences! You can try to account for this using the `utc` flags and/or by including a timezone offset in a datetime string to parse using `as_datetime` or `strptime`.
- Including time extensions in your templates does not cause them to refresh more regularly by themselves, although they will still update whenever the `hass` object does. If you are a developer, you have to implement this behavior yourself in your custom cards.

| Name             | Type             | Arguments                                                | Description                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| now              | function         |                                                          | Returns a datetime object that represents the current time in your time zone.                                                                                                                                                                                                                                                                                                                      |
| utcnow           | function         |                                                          | Returns a datetime object of the current time in the UTC timezone.                                                                                                                                                                                                                                                                                                                                 |
| today_at         | function, filter | value                                                    | Converts a string containing a military time format to a datetime object with today’s date in your time zone. Defaults to midnight (00:00).                                                                                                                                                                                                                                                        |
| as_datetime      | function, filter | value, fallback (optional), utc (default true)           | Converts a string containing a timestamp, or valid UNIX timestamp, to a datetime object. If that fails, it returns the fallback value or, if omitted, raises an error. When the input is already a datetime object it will be returned as is. in case the input is a datetime.date object, midnight will be added as time.                                                                         |
| as_timestamp     | function, filter | value, fallback (optional)                               | Converts a datetime object or string to UNIX timestamp. If that fails, returns the fallback value, or if omitted raises an error.                                                                                                                                                                                                                                                                  |
| as_local         | function, filter | value                                                    | Converts a datetime object to local time.                                                                                                                                                                                                                                                                                                                                                          |
| strptime         | function         | value, format, fallback (optional), utc (default false)  | Parses a string based on a [format](https://d3js.org/d3-time-format#locale_format) and returns a datetime object. If that fails, it returns the default value or, if omitted, raises an error.                                                                                                                                                                                                     |
| time_since       | function, filter | value, precision (default 1)                             | Returns a human readable string indicating the difference between now and an input past datetime object. `precision` indicates how many units (years, months, days, hours, minutes, seconds) to use, with the last unit being rounded and 0 being the same as 6. If the input datetime is in the past it returns the input. If the input datetime is not a datetime object it returns nothing.     |
| time_until       | function, filter | value, precision (default 1)                             | Returns a human readable string indicating the difference between now and an input future datetime object. `precision` indicates how many units (years, months, days, hours, minutes, seconds) to use, with the last unit being rounded and 0 being the same as 6. If the input datetime is in the future it returns the input. If the input datetime is not a datetime object it returns nothing. |
| as_timedelta     | function, filter | value                                                    | Converts a string to a timedelta object. Expects data in the format `DD HH:MM:SS.uuuuuu`, `DD HH:MM:SS,uuuuuu`, or as specified by ISO 8601 (e.g. `P4DT1H15M20S` which is equivalent to `4 1:15:20`) or PostgreSQL’s day-time interval format (e.g. `3 days 04:05:06`).                                                                                                                            |
| timestamp_local  | filter           | value, fallback (optional)                               | Converts a UNIX timestamp to the ISO format string representation as date/time in your local timezone. If that fails, returns the `fallback` value, or if omitted raises an error.                                                                                                                                                                                                                 |
| timestamp_utc    | filter           | value, fallback (optional)                               | Converts a UNIX timestamp to the ISO format string representation as date/time in UTC timezone. If that fails, returns the `fallback` value, or if omitted raises an error.                                                                                                                                                                                                                        |
| timestamp_custom | filter           | value, format, local (default true), fallback (optional) | Converts a UNIX timestamp to its string representation based on a custom format. Uses the local timezone by default. If that fails, returns the `fallback` value, or if omitted raises an error.                                                                                                                                                                                                   |

In addition to these functions, you have access to [a datetime library](https://github.com/Nerwyn/ts-py-datetime) which emulates the Python datetime module in TypeScript. You can instantiate `date`, `time`, `datetime`, and `timedelta` objects using the `dt` object. You can then access it's class methods using these objects. To use the static method and constants of these classes, you can reference them directly without prefixing them with `dt`. See the README in the datetime repository linked above for more information on how to use it.

| Name         | Type     | Arguments                                                                                                                | Description                                                                                                                  |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| dt           | object   |                                                                                                                          | The datetime object, which contains constructor functions for date, datetime, time, and timedelta along with some constants. |
| dt.date      | function | year, month, day                                                                                                         | Returns a date object.                                                                                                       |
| dt.datetime  | function | year, month, day, hour (default 0), minute (default 0), second (default 0), millisecond (default 0), utc (default false) | Returns a datetime object, like the ones used by the functions above.                                                        |
| dt.time      | function | hour (default 0), minute (default 0), second (default 0), millisecond (default 0)                                        | Returns a time object.                                                                                                       |
| dt.timedelta | function | days (optional), seconds (optional), milliseconds (optional), minutes (optional), hours (optional), weeks (optional)     | Returns a timedelta object.                                                                                                  |
| date         | class    |                                                                                                                          | The date class, which has static methods which can be called upon.                                                           |
| datetime     | class    |                                                                                                                          | The datetime class, which has static methods which can be called upon.                                                       |
| time         | class    |                                                                                                                          | The time class, which has static methods which can be called upon.                                                           |
| timedelta    | class    |                                                                                                                          | The timedelta class, which has static methods which can be called upon.                                                      |

### [To/From JSON](https://www.home-assistant.io/docs/configuration/templating/#tofrom-json)

| Name      | Type   | Arguments                                  | Description                                                                                                                                                                                                                                                                                                                       |
| --------- | ------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| to_json   | filter | obj, ensure_ascii, pretty_print, sort_keys | Turn an object into a JSON string. `ensure_ascii` converts unicode characters into escape sequences. `pretty_print` formats the output with new lines and an indent of two spaces. `sort_keys` sorts the keys of the JSON object. **Consider using the nunjucks `safe` filter with this, or the nunjucks `dump` filter instead.** |
| from_json | filter | value                                      | Parse a string as JSON.                                                                                                                                                                                                                                                                                                           |

### [Distance](https://www.home-assistant.io/docs/configuration/templating/#distance)

| Name     | Type             | Arguments | Description                                                                                                                                                                        |
| -------- | ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| distance | function         | args      | Measures the distance between home, an entity, or coordinates. The unit of measurement (kilometers or miles) depends on the system’s configuration settings.                       |
| closest  | function, filter | args      | Finds the closest entity to home, or the first entity or coordinate if multiple provided. Arguments can be entity IDs, domains, entity state objects, coordinate pairs, or arrays. |

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
| bitwise_not      | filter           | value                                         | Performs a bitwise not(~) operation with one value.                                                                                                                                                                                                                                                                                                      |
| ord              | filter           | value                                         | Returns an integer representing a character's (string of length one) Unicode code point.                                                                                                                                                                                                                                                                 |
| multiply         | filter           | value, arg                                    | Converts the input to a number and multiplies it by the argument.                                                                                                                                                                                                                                                                                        |
| add              | filter           | value, arg                                    | Converts the input to a number and adds it to the argument.                                                                                                                                                                                                                                                                                              |

### [Complex Type Checking](https://www.home-assistant.io/docs/configuration/templating/#complex-type-checking)

| Name        | Type | Arguments | Description                                        |
| ----------- | ---- | --------- | -------------------------------------------------- |
| list        | test | value     | Tests if a value is a list/array.                  |
| set         | test | value     | Tests if a value is a set.                         |
| datetime    | test | value     | Tests if a value is a datetime.                    |
| string_like | test | value     | Tests if a value is a string, bytes, or bytearray. |

### [Type Conversions](https://www.home-assistant.io/docs/configuration/templating/#type-conversions)

| Name | Type     | Arguments | Description                                            |
| ---- | -------- | --------- | ------------------------------------------------------ |
| set  | function | args      | Convert a list/array to a set. Removes duplicates.     |
| list | function | args      | Convert a set to an array. Does not remove duplicates. |

### [Iterating Multiple Objects](https://www.home-assistant.io/docs/configuration/templating/#iterating-multiple-objects)

| Name | Type     | Arguments | Description                                                                                                                        |
| ---- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| zip  | function | args      | Use to iterate over multiple collections in one operation. If given one array will perform the opposite action and unzip the list. |

### [Regular Expressions](https://www.home-assistant.io/docs/configuration/templating/#regular-expressions)

**NOTE**: The format of regular expressions in nunjucks is different than jinja2. You may want to read the [Nunjucks](https://mozilla.github.io/nunjucks/templating.html#regular-expressions) and [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) documentation.

| Name                | Type   | Arguments                                      | Description                                                                                                                          |
| ------------------- | ------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| match               | test   | value, find                                    | Matches the find string at the beginning of the value string using regex.                                                            |
| search              | test   | value, find                                    | Matches the find string anywhere in the value string using regex.                                                                    |
| test                | test   | value, find                                    | Matches the find regular expression in the value string using regex. Regular expressions should be preceded by r, like `r/foobar/g`. |
| regex_replace       | filter | value, find (default ''), replace (default '') | Replaces the find expression with the replace expression string using RegEx.                                                         |
| regex_findall       | filter | value, find (default '')                       | Finds all RegEx matches of the find expression in value and returns an array of matches.                                             |
| regex_findall_index | filter | value, find (default ''), index (default 0)    | Performs a RegEx find all but returns the match at a provided index.                                                                 |

### Miscellaneous

Functions that are not from the Home Assistant templating documentation.

| Name        | Type             | Arguments | Description                                                                                                                                           |
| ----------- | ---------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| match_media | function         | value     | Returns the boolean result of the provided [CSS media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). |
| str         | function, filter | value     | Return the string representation of the input.                                                                                                        |

[last-commit-shield]: https://img.shields.io/github/last-commit/Nerwyn/ha-nunjucks?style=for-the-badge
[commits]: https://github.com/Nerwyn/ha-nunjucks/commits/main
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/t/an-easy-way-to-add-templating-support-to-your-custom-front-end-projects/651621
[license-shield]: https://img.shields.io/github/license/Nerwyn/ha-nunjucks.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Nerwyn-blue.svg?style=for-the-badge
[github]: https://img.shields.io/github/followers/Nerwyn.svg?style=social
