import {NEGATIVE_ENGRAVINGS} from "../../constants/NegativeEngravings";

export function modifyEngravingsList() {
    let allEngravingList = document.querySelectorAll('.swiper-slide>li');
    if (allEngravingList.length > 0) {
        allEngravingList.forEach(element => {
            let divStyled = document.createElement('div')
            divStyled.style.justifyContent = "space-between"
            divStyled.innerHTML = element.firstElementChild.innerHTML.replace(/(.+)\s(\d ур\.)/g, '<span>$1</span><span>$2</span>')
            if (NEGATIVE_ENGRAVINGS.includes(divStyled.firstElementChild.innerText)) {
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