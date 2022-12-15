let ratingByClass = {};
let characterList = [];
const negativeList = ['Износ', 'Ржавчина', 'Медлительность', 'Миролюбие'];

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

function modifyEngravingsList() {
    let allEngravingList = document.querySelectorAll('.swiper-slide>li');
    if (allEngravingList.length > 0) {
        allEngravingList.forEach(element => {
            let divStyled = document.createElement('div')
            divStyled.style.justifyContent = "space-between"
            divStyled.innerHTML = element.firstElementChild.innerHTML.replace(/(.+)\s(\d ур\.)/g, '<span>$1</span><span>$2</span>')
            if (negativeList.includes(divStyled.firstElementChild.innerText)) {
                divStyled.firstElementChild.style.color = 'red'
            }

            element.firstElementChild.replaceWith(divStyled)
        })
        if (allEngravingList.length > 3) {
            let engravingElement = document.querySelector('ul.swiper-slide.swiper-slide-active');
            let engravingsSwiper = document.querySelector('div.swiper-wrapper');
            if (engravingElement) {
                engravingElement.replaceChildren(...allEngravingList);
                document.querySelector('.swiper-option').remove();
                document.querySelector('.profile-ability-engrave').style.height = 'auto';
                engravingsSwiper.replaceChildren(document.querySelector('div.swiper-wrapper').firstElementChild)
            }
        }
    }
}

modifyEngravingsList();