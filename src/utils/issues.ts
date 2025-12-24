import { HomeAssistant } from '../models/interfaces/hass';
import { RepairsIssue } from '../models/interfaces/registries';

export async function fetchRepairsIssues(hass: HomeAssistant) {
	const repairsIssues = (
		await hass.connection.sendMessagePromise<Record<'issues', RepairsIssue[]>>({
			type: 'repairs/list_issues',
		})
	).issues;
	for (const issue of repairsIssues) {
		window.haNunjucks.repairsIssues[
			`${issue.issue_domain || issue.domain},${issue.issue_id}`
		] = issue;
	}
}

export function issues() {
	return window.haNunjucks.repairsIssues;
}

export function issue(domain: string, issue_id: string) {
	return window.haNunjucks.repairsIssues[`${domain},${issue_id}`];
}
