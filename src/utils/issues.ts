import { HomeAssistant } from '../models/interfaces/hass';
import { RepairsIssue } from '../models/interfaces/registries';

export async function fetchRepairsIssues(hass: HomeAssistant) {
	const repairsIssues = (
		await hass.connection.sendMessagePromise<Record<'issues', RepairsIssue[]>>({
			type: 'repairs/list_issues',
		})
	).issues;
	const issues: Record<string, RepairsIssue> = {};
	for (const issue of repairsIssues) {
		issues[`${issue.issue_domain || issue.domain},${issue.issue_id}`] = issue;
	}
	window.haNunjucks.repairsIssues.issues = issues;
}

export function issues() {
	return window.haNunjucks.repairsIssues.issues;
}

export function issue(domain: string, issue_id: string) {
	return window.haNunjucks.repairsIssues.issues[`${domain},${issue_id}`];
}
