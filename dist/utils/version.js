var ModifierType;
(function (ModifierType) {
    ModifierType[ModifierType["dev"] = 0] = "dev";
    ModifierType[ModifierType["alpha"] = 1] = "alpha";
    ModifierType[ModifierType["beta"] = 2] = "beta";
    ModifierType[ModifierType["rc"] = 3] = "rc";
    ModifierType[ModifierType["release"] = 4] = "release";
})(ModifierType || (ModifierType = {}));
class SemanticVersion {
    constructor(version) {
        const prefixes = ['v.', 'V.', 'v', 'V'];
        for (const prefix of prefixes) {
            if (version.startsWith(prefix)) {
                this.prefix = prefix;
                version = version.replace(prefix, '');
                break;
            }
        }
        this.version = version;
        const [mmp, modifier] = version.split('-');
        [this.major, this.minor, this.patch] = mmp
            .split('.')
            .map((n) => Number(n ?? 0));
        this.modifier = modifier;
        const [mType, mVersion] = modifier?.split('.') || [];
        this.modifier_type = mType;
        this.modifierTypeEnum =
            ModifierType[mType] ?? ModifierType.release;
        this.prerelease = isNaN(Number(mVersion)) ? 0 : Number(mVersion);
    }
    get alpha() {
        return this.modifierTypeEnum == ModifierType.alpha;
    }
    get beta() {
        return this.modifierTypeEnum == ModifierType.beta;
    }
    get dev() {
        return this.modifierTypeEnum == ModifierType.dev;
    }
    get release_candidate() {
        return this.modifierTypeEnum == ModifierType.rc;
    }
    get year() {
        return this.major;
    }
    /**
     * Compare to another semantic versions
     * @param {string} version
     * @returns {1 | 0 | -1}
     */
    compare(version) {
        if (this.version == version) {
            return 0;
        }
        const sv = new SemanticVersion(version);
        const fields = [
            'major',
            'minor',
            'patch',
            'modifierTypeEnum',
            'prerelease',
        ];
        for (const field of fields) {
            if (this[field] != sv[field]) {
                return this[field] > sv[field] ? 1 : -1;
            }
        }
        return 0;
    }
    /**
     * Check if this version is within a range of versions
     * @param {string} lowest
     * @param {string} highest
     * @returns {boolean}
     */
    in_range(lowest, highest) {
        return this.compare(lowest) >= 0 && this.compare(highest) <= 0;
    }
    /**
     * Get the difference between this version and another version
     * @param {string} version
     * @returns {SemanticVersionDiff}
     */
    diff(version) {
        const sv = new SemanticVersion(version);
        const changes = {
            major: this.major != sv.major,
            minor: this.minor != sv.minor,
            patch: this.patch != sv.patch,
            modifier: this.modifier != sv.modifier,
        };
        return new SemanticVersionDiff(changes);
    }
    /**
     * Returns the value of the specified section of the version
     * @param {number} idx
     * @returns {number | string}
     */
    section(idx) {
        return ([this.major, this.minor, this.patch, this.modifier_type, this.prerelease][idx] || 0);
    }
    valueOf() {
        return (this.major * 100000000000000 +
            this.minor * 10000000000 +
            this.patch * 1000000 +
            this.modifierTypeEnum * 10000 +
            this.prerelease);
    }
    toString() {
        return this.version;
    }
}
class SemanticVersionDiff {
    constructor(changes) {
        this.major = changes.major;
        this.minor = changes.minor;
        this.patch = changes.patch;
        this.modifier = changes.modifier;
    }
    toString() {
        return `SemanticVersionDiff(major=${this.major}, minor=${this.minor}, patch=${this.patch}, modifier=${this.modifier})`;
    }
}
export function version(version) {
    return new SemanticVersion(version);
}
