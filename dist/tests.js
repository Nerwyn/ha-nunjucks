import { match, search } from './utils/regexp';
import { datetime, list, set, string_like } from './utils/type_checking';
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
    datetime,
    string_like,
    // Regular Expressions
    match,
    search,
};
