export function addHistory(historyLists) {
    return {type: '@HISTORY/ADD_HISTORY', historyLists: historyLists};
}

export function deleteHistory() {
    return {type: '@HISTORY/DELETE_HISTORY'};
}
