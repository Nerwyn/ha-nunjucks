export async function fetchRepairsIssues(hass) {
    const repairsIssues = (await hass.connection.sendMessagePromise({
        type: 'repairs/list_issues',
    })).issues;
    for (const issue of repairsIssues) {
        window.haNunjucks.repairsIssues[`${issue.issue_domain || issue.domain},${issue.issue_id}`] = issue;
    }
}
export function issues() {
    return window.haNunjucks.repairsIssues;
}
export function issue(domain, issue_id) {
    return window.haNunjucks.repairsIssues[`${domain},${issue_id}`];
}
