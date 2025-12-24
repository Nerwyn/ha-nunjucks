export async function fetchRepairIssues(hass) {
    const issues = await hass.connection.sendMessagePromise({
        type: 'repairs/list_issues',
    });
}
