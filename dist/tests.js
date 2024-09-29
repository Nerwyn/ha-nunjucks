import { contains } from './utils/contains';
import { match, search, test } from './utils/regexp';
import { is_datetime, list, set, string_like } from './utils/type_checking';
export function addTests(env) {
    for (const func in TESTS) {
        env.addTest(func, function (...args) {
            return TESTS[func](...args);
        });
    }
    return env;
}
const TESTS = {
    // Complex Type Checking
    list,
    set,
    datetime: is_datetime,
    string_like,
    // Contains
    contains,
    // Regular Expressions
    match,
    search,
    test,
};
