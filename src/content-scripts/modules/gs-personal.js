export function loadAllCharacters(characterList) {
    characterList.forEach(char => {
        chrome.runtime.sendMessage({type: 'load-character-info', name: char.name}, (response) => {
            char.element.innerHTML = char.name + '(' + response.gs + ')'
        });
    })
}