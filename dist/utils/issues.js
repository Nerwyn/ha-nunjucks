export async function fetchRepairsIssues(hass) {
    const repairsIssues = (await hass.connection.sendMessagePromise({
        type: 'repairs/list_issues',
    })).issues;
    const issues = {};
    for (const issue of repairsIssues) {
        issues[`${issue.issue_domain || issue.domain},${issue.issue_id}`] = issue;
    }
    window.haNunjucks.repairsIssues.issues = issues;
}
export function issues() {
    return window.haNunjucks.repairsIssues.issues;
}
export function issue(domain, issue_id) {
    return window.haNunjucks.repairsIssues.issues[`${domain},${issue_id}`];
}
