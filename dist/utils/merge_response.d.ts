interface ActionResponse {
    [key: string]: {
        [key: string]: string | Record<string, string> | Record<string, string>[];
    };
}
export declare function merge_response(value: ActionResponse): {
    [key: string]: string | Record<string, string> | Record<string, string>[];
}[];
export {};
