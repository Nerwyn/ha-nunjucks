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
export async function handleWhenReady(
	handler: () => void | Promise<void>,
	handleReady: () => boolean | Promise<boolean>,
	timeout: number = 20000,
	delay: number = 10,
	errorMessage: string = `handleWhenReady ${timeout}ms timeout exceeded`,
) {
	if (delay > timeout) {
		console.error(errorMessage);
		return;
	}

	if (!(await handleReady())) {
		setTimeout(
			async () =>
				await handleWhenReady(handler, handleReady, timeout, delay * 2),
			delay,
		);
		return;
	}

	await handler();
}

interface SemanticVersion {
	major: number;
	minor: number;
	patch: number;
	prerelease: number;
	prereleaseVersion: number;
}

const prereleaseOrder: Record<string, number> = {
	dev: 0,
	alpha: 1,
	beta: 2,
	rc: 3,
	release: 4,
};

/**
 * Get Semantic Version object from version string
 * @param {string} version
 * @returns {SemanticVersion}
 */
function getSemanticVersion(version: string): SemanticVersion {
	const [mmp, prerelease] = version.split('-');
	const [major, minor, patch] = mmp.split('.').map(Number);
	const [pOrder, pVersion] = prerelease?.split('.') || ['release', '0'];
	return {
		major: major || 0,
		minor: minor || 0,
		patch: patch || 0,
		prerelease: prereleaseOrder[pOrder] ?? 4,
		prereleaseVersion: isNaN(Number(pVersion)) ? 0 : Number(pVersion),
	};
}

/**
 * Compare two semantic versions
 * @param {string} v1
 * @param {string} v2
 * @returns {1 | 0 | -1}
 */
export function compareVersions(v1: string, v2: string): 1 | 0 | -1 {
	if (v1 == v2) {
		return 0;
	}

	const sv1 = getSemanticVersion(v1);
	const sv2 = getSemanticVersion(v2);

	const fields = [
		'major',
		'minor',
		'patch',
		'prerelease',
		'prereleaseVersion',
	] as const;
	for (const field of fields) {
		if (sv1[field] != sv2[field]) {
			return sv1[field] > sv2[field] ? 1 : -1;
		}
	}

	return 0;
}
