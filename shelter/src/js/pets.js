import {getPets, generatePetsOrderI} from "./utils.js"
import {Pet} from './Pet.js';

const BUTTON_LEFT2 = document.querySelector(".left-arrow2");
const BUTTON_LEFT = document.querySelector(".left-arrow");
const BUTTON_RIGHT = document.querySelector(".right-arrow");
const BUTTON_RIGHT2 = document.querySelector(".right-arrow2");
const PAGE_NUMBER = document.querySelector(".current-page");
const PETS_LIST_MAIN = document.querySelector(".our-friends-pics-flex")

let pets;
let rest8 = [];
let rest6 = [];
let pagesCnt;
let cntCards = 8;
let petsAll = [];
let leftPet = 0;
let currentPage = 1;
let cntPets;


function addRandomPets(current, cntCards){
    PETS_LIST_MAIN.textContent = '';
    for (let i of current.slice(0, cntCards)){
        const petCard = pets[i].createPet();
        PETS_LIST_MAIN.append(petCard);
    }
    PAGE_NUMBER.textContent = currentPage;
}

const generatePets = (data) => data.map(pet => new Pet(pet));

async function init(){
    const data = await getPets();
    cntPets = data.length*6;
    pets = generatePets(data);

    getCardCnt();
    
    for (let i=0; i < cntPets; i++){ 
        const result = generatePetsOrderI(rest8, rest6);
        petsAll.push(result[0]);
        rest8 = result[1];
        rest6 = result[2];
    }

    addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), cntCards);
}

init()

function buttonLeftPress(){
    if (currentPage > 1){
        getCardCnt();
        currentPage--;
        addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), cntCards);
        PAGE_NUMBER.textContent = currentPage;
        if (currentPage == 1){
            makeActive(BUTTON_LEFT, false)
            makeActive(BUTTON_LEFT2, false)
        }
        if (currentPage <= pagesCnt){
            makeActive(BUTTON_RIGHT, true)
            makeActive(BUTTON_RIGHT2, true)
        }
    }
}

function buttonLeft2Press(){
    getCardCnt();
    if (currentPage > 1){
        currentPage = 1;
        addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), cntCards);
        PAGE_NUMBER.textContent = currentPage;

        makeActive(BUTTON_LEFT, false)
        makeActive(BUTTON_LEFT2, false)
        makeActive(BUTTON_RIGHT, true)
        makeActive(BUTTON_RIGHT2, true)
    }
}

function buttonRightPress(){
    getCardCnt();
    if (currentPage < pagesCnt){
        currentPage++;
        addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), cntCards);
        PAGE_NUMBER.textContent = currentPage;
        if (currentPage > 1){
            makeActive(BUTTON_LEFT, true)
            makeActive(BUTTON_LEFT2, true)
        }
        if (currentPage == pagesCnt){
            makeActive(BUTTON_RIGHT, false)
            makeActive(BUTTON_RIGHT2, false)
        }
    }
}

function buttonRight2Press(){
    getCardCnt();
    if (currentPage < pagesCnt){
        currentPage = pagesCnt;
        addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), cntCards);
        PAGE_NUMBER.textContent = currentPage;
        
        makeActive(BUTTON_RIGHT, false)
        makeActive(BUTTON_RIGHT2, false)
        makeActive(BUTTON_LEFT, true)
        makeActive(BUTTON_LEFT2, true)
    }
}

function makeActive(btn, enabled){
    if (enabled){
        btn.classList.add("next-item")
        btn.classList.remove("inactive-item")
    } else {
        btn.classList.remove("next-item")
        btn.classList.add("inactive-item")
    }
}

BUTTON_LEFT.addEventListener("click", buttonLeftPress)
BUTTON_RIGHT.addEventListener("click", buttonRightPress)
BUTTON_LEFT2.addEventListener("click", buttonLeft2Press)
BUTTON_RIGHT2.addEventListener("click", buttonRight2Press)


window.addEventListener("resize", () => {
    const w = window.innerWidth;
    getCardCnt();
    addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), cntCards);
})


function getCardCnt(){
    const w = window.innerWidth;
    if (w >= 1200) {
        leftPet = (currentPage-1)*cntCards;
        cntCards = 8;
        currentPage = Math.floor(leftPet / cntCards) + 1;
    }
    else if (w < 1200 && w > 580) {
        leftPet = (currentPage-1)*cntCards;
        cntCards = 6;
        currentPage = Math.floor(leftPet / cntCards) + 1;
    } else {
        leftPet = (currentPage-1)*cntCards;
        cntCards = 3;
        currentPage = Math.floor(leftPet / cntCards) + 1;
    }
    pagesCnt = cntPets/cntCards;
}