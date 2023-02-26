import {createApp} from 'vue'
import QualityBar from "../view/QualityBar.vue";

export function displayQuality() {
    let profileData = {};
    const equipmentList = document.querySelectorAll('.profile-equipment__slot>div');
    profileData = JSON.parse(document.querySelector('#profile-ability > script').innerText.replace(/.+\{/, '[{').replace(/;\n$/, ']'))
    equipmentList.forEach(element => {
        if (element.classList.length === 1 && parseInt(element.className.replace(/slot(\d+)$/, '$1')) <= 11) {
            let gearId = element.getAttribute('data-item')
            let gearSlotQuality = parseInt(profileData[0].Equip[gearId].Element_001.value.qualityValue)
            element.style.flexWrap = "wrap"
            createApp(QualityBar, {
                quality: gearSlotQuality,
                url: element.firstElementChild.getAttribute('src')
            }).mount(element)
        }
    })
}

