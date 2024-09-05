import {getPets, generatePetsOrder} from "./utils.js"
import {Pet} from './Pet.js';

const BUTTON_LEFT2 = document.querySelector(".left-arrow2");
const BUTTON_LEFT = document.querySelector(".left-arrow");
const BUTTON_RIGHT = document.querySelector(".right-arrow");
const BUTTON_RIGHT2 = document.querySelector(".right-arrow2");
const PAGE_NUMBER = document.querySelector(".current-page");
const PETS_LIST_MAIN = document.querySelector(".our-friends-pics-flex")

let pets;
let rest;
const pagesCnt = 8;
let petsAll = new Array(pagesCnt);
let currentPage = 0;


function addRandomPets(current, startPos, cntCards){
    PETS_LIST_MAIN.textContent = '';
    for (let i of current.slice(startPos, cntCards)){
        const petCard = pets[i].createPet();
        PETS_LIST_MAIN.append(petCard);
    }
}

const generatePets = (data) => data.map(pet => new Pet(pet));

async function init(){
    const data = await getPets();
    const cntPets = data.length;
    pets = generatePets(data);

    const startPos = 0;
    const cntCards = 8;
    // rest = Array.from({length: cntPets}, (v, i) => i);
    // rest = generatePetsOrder(rest, cntCards);
    
    for (let i=0; i < petsAll.length; i++){
        rest = Array.from({length: cntPets}, (v, i) => i);
        rest = generatePetsOrder(rest, cntCards);
        petsAll[i] = rest;
    }
    
    console.log(petsAll)

    addRandomPets(petsAll[currentPage], startPos, cntCards);
}

init()

function buttonLeftPress(){
    const startPos = 0;
    const cntCards = 8;
    currentPage--;
    addRandomPets(petsAll[currentPage], startPos, cntCards);
    PAGE_NUMBER.textContent = currentPage+1;
    if (currentPage+1 == 1){
        BUTTON_LEFT.classList.remove("next-item")
        BUTTON_LEFT.classList.add("inactive-item")
        BUTTON_LEFT2.classList.remove("next-item")
        BUTTON_LEFT2.classList.add("inactive-item")
    }
    if (currentPage+1 < 8){
        BUTTON_RIGHT.classList.add("next-item")
        BUTTON_RIGHT.classList.remove("inactive-item")
        BUTTON_RIGHT2.classList.add("next-item")
        BUTTON_RIGHT2.classList.remove("inactive-item")
    }
}

function buttonRightPress(){
    const startPos = 0;
    const cntCards = 8;
    currentPage++;
    addRandomPets(petsAll[currentPage], startPos, cntCards);
    PAGE_NUMBER.textContent = currentPage+1;
    if (currentPage+1 > 1){
        BUTTON_LEFT.classList.add("next-item")
        BUTTON_LEFT.classList.remove("inactive-item")
        BUTTON_LEFT2.classList.add("next-item")
        BUTTON_LEFT2.classList.remove("inactive-item")
    }
    if (currentPage+1 == pagesCnt){
        BUTTON_RIGHT.classList.remove("next-item")
        BUTTON_RIGHT.classList.add("inactive-item")
        BUTTON_RIGHT2.classList.remove("next-item")
        BUTTON_RIGHT2.classList.add("inactive-item")
    }
}

BUTTON_LEFT.addEventListener("click", buttonLeftPress)
BUTTON_RIGHT.addEventListener("click", buttonRightPress)
