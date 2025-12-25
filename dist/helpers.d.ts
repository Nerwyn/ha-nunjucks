/**
 * Call a handler function when a ready function returns true.
 * If the ready function returns false, this method recursively recalls itself on a timeout.
 * The function continues to recall itself with an exponentially increasing timeout until
 * the ready function returns true or the timeout is exceeded.
 * @param {() => void | Promise<void>} handler The function to call when ready
 * @param {() => boolean | Promise<boolean>} handleReady The function to check and return true when ready
 * @param {number} timeout The max time to wait in milliseconds, defaults to 20000
 * @param {number} delay The initial delay in milliseconds, defaults to 10
 */
export declare function handleWhenReady(handler: () => void | Promise<void>, handleReady: () => boolean | Promise<boolean>, timeout?: number, delay?: number, errorMessage?: string): Promise<void>;
