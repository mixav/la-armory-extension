let ratingByClass = {};

export function getForClasses(characterList) {
    chrome.runtime.sendMessage({
        type: 'load-for-class',
        message: [...new Set(characterList.map(item => item.class))]
    }, (response) => {
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