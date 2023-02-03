import {COLOR_TABLE} from "../../constants/ColorTable";

export function displayQuality() {
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