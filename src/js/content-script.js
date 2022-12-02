let ratingByClass = {};
let characterList = [];

function getForClasses(className) {
    chrome.runtime.sendMessage({type: 'load-for-class', message: className}, (response) => {
        ratingByClass = response;
        characterList.forEach(el => {
            let gs = findByClassAndName(el.class, el.name);
            if (gs && gs > 0) {
                el.element.innerHTML = el.name + '(' + gs + ')';
            }
        })
    });
}

function findByClassAndName(charClass, name) {
    if (ratingByClass[charClass]) {
        return ratingByClass[charClass].find(row => row.nickname === name)?.rating;
    }
    return 0;
}

let domCharacterList = document.querySelectorAll("#expand-character-list > ul > li");
domCharacterList.forEach((character) => {
    characterList.push({
        element: character.querySelector('span > button > span'),
        name: character.querySelector("button span").textContent,
        class: character.querySelector("button img").getAttribute('alt')
    });
});
let expandCharacterList = document.getElementById('expand-character-list');
let button = document.createElement('button');
button.onclick = function () {
    characterList.forEach(char => {
        chrome.runtime.sendMessage({type: 'load-character-info', name: char.name}, (response) => {
            char.element.innerHTML = char.name + '(' + response.gs + ')'
        });
    })
}
button.innerHTML = '&circlearrowright;'
expandCharacterList.prepend(button);
getForClasses([...new Set(characterList.map(item => item.class))]);