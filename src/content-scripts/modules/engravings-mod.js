import {createApp} from "vue";
import EngravingList from "../view/EngravingList.vue";

export function modifyEngravingsList() {
    const engravingBlock = document.querySelector('.profile-ability-engrave');
    engravingBlock.style.height = 'auto';
    const allEngravingList = document.querySelectorAll('.swiper-slide>li');
    const engravingArray = [];
    if (allEngravingList.length > 0) {
        allEngravingList.forEach(element => {
            let engravingInfo = JSON.parse(element.firstElementChild.innerHTML.replace(/(.+)\s(\d) ур\./g, '{"name":"$1", "level":$2}'))
            engravingInfo.tooltipText = element.lastElementChild.firstElementChild.innerText
            engravingArray.push(engravingInfo)
        })
    }
    createApp(EngravingList, {engravingList: engravingArray}).mount(engravingBlock);
}