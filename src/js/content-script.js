let ratingByClass = {};
let characterList = [];
const negativeList = ['Износ', 'Ржавчина', 'Медлительность', 'Миролюбие'];
import {COLOR_TABLE} from "../constants/ColorTable";

const settings = {
    loadAtStart: true, modifyEngravings: true
}

const loadAllCharacters = function () {
    characterList.forEach(char => {
        chrome.runtime.sendMessage({type: 'load-character-info', name: char.name}, (response) => {
            char.element.innerHTML = char.name + '(' + response.gs + ')'
        });
    })
}

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

async function initStorageCache() {
    await chrome.storage.sync.get().then((storedSettings) => {
        Object.assign(settings, storedSettings);
    })
}

await initStorageCache();
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
button.onclick = loadAllCharacters;
button.innerHTML = '&circlearrowright;'
expandCharacterList.prepend(button);
if (settings.loadAtStart) {
    loadAllCharacters()
} else {
    getForClasses([...new Set(characterList.map(item => item.class))])
}

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

function displayQuality() {
    let profileData = {};
    let equipmentList = document.querySelectorAll('.profile-equipment__slot>div');
    profileData = JSON.parse(document.querySelector('#profile-ability > script').innerText.replace(/.+\{/, '[{').replace(/;\n$/, ']'))
    equipmentList.forEach(element => {
        if (element.classList.length === 1 && parseInt(element.className.replace(/slot(\d+)$/, '$1')) <= 11) {
            let gearId = element.getAttribute('data-item')
            let bar = document.createElement('div')
            let gearSlotQuality = parseInt(profileData[0].Equip[gearId].Element_001.value.qualityValue)
            bar.style.width = "90%"
            bar.style.backgroundColor = "lightgray"
            bar.style.borderRadius = "3px"
            bar.style.padding = "1px"
            let quality = document.createElement('div')
            quality.style.backgroundColor = colorPicker(gearSlotQuality)
            quality.style.width = gearSlotQuality !== 0 ? gearSlotQuality + '%' : '100%'
            quality.style.height = "6px"
            quality.style.borderRadius = "3px"
            bar.appendChild(quality)
            element.appendChild(bar)
            element.style.flexWrap = "wrap"
        }
    })
}

function colorPicker(quality) {
    let colorId;
    switch (true) {
        case quality === 0:
            colorId = 0;
            break;
        case quality < 39:
            colorId = 25;
            break;
        case quality < 70:
            colorId = 50;
            break;
        case quality < 90:
            colorId = 70;
            break;
        case quality < 100:
            colorId = 90;
            break;
        case quality === 100:
            colorId = 100;
            break;
    }
    return COLOR_TABLE[colorId];
}

if (settings.displayQuality)
    displayQuality();

if (settings.modifyEngravings) {
    modifyEngravingsList();
}