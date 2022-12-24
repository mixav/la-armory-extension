function save_options() {
    const loadAtStart = document.getElementById('loadAtStart').checked;
    const modifyEngravings = document.getElementById('modifyEngravings').checked;
    const displayQuality = document.getElementById('displayQuality').checked;
    chrome.storage.sync.set({
        loadAtStart: loadAtStart,
        modifyEngravings: modifyEngravings,
        displayQuality: displayQuality
    }, function () {
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    // Use default value
    chrome.storage.sync.get({
        loadAtStart: true,
        modifyEngravings: true,
        displayQuality: true
    }, function (items) {
        document.getElementById('loadAtStart').checked = items.loadAtStart;
        document.getElementById('modifyEngravings').checked = items.modifyEngravings;
        document.getElementById('displayQuality').checked = items.displayQuality;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);