function save_options() {
    const loadAtStart = document.getElementById('loadAtStart').checked;
    const modifyEngravings = document.getElementById('modifyEngravings').checked;
    chrome.storage.sync.set({
        loadAtStart: loadAtStart,
        modifyEngravings: modifyEngravings
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
        modifyEngravings: true
    }, function (items) {
        document.getElementById('loadAtStart').checked = items.loadAtStart;
        document.getElementById('modifyEngravings').checked = items.modifyEngravings;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);