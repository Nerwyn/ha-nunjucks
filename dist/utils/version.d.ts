declare class SemanticVersion {
    version: string;
    prefix?: string;
    major: number;
    minor: number;
    patch: number;
    modifier?: string;
    modifier_type?: string;
    private modifierTypeEnum;
    private prerelease;
    constructor(version: string);
    get alpha(): boolean;
    get beta(): boolean;
    get dev(): boolean;
    get release_candidate(): boolean;
    get year(): number;
    /**
     * Compare to another semantic versions
     * @param {string} version
     * @returns {1 | 0 | -1}
     */
    compare(version: string): 1 | 0 | -1;
    /**
     * Check if this version is within a range of versions
     * @param {string} lowest
     * @param {string} highest
     * @returns {boolean}
     */
    in_range(lowest: string, highest: string): boolean;
    /**
     * Get the difference between this version and another version
     * @param {string} version
     * @returns {SemanticVersionDiff}
     */
    diff(version: string): SemanticVersionDiff;
    /**
     * Returns the value of the specified section of the version
     * @param {number} idx
     * @returns {number | string}
     */
    section(idx: number): number | string;
    valueOf(): number;
    toString(): string;
}
declare class SemanticVersionDiff {
    major: boolean;
    minor: boolean;
    patch: boolean;
    modifier: boolean;
    constructor(changes: Record<string, boolean>);
    toString(): string;
}
export declare function version(version: string): SemanticVersion;
export {};
