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
const pagesCnt = 6;
let cntCards = 8;
let petsAll = [];
let offset = 0;
let currentPage = 1;


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
    cntCards = 8;
    
    for (let i=0; i < pagesCnt*cntCards; i++){ 
        const result = generatePetsOrderI(rest8, rest6);
        petsAll.push(result[0]);
        rest8 = result[1];
        rest6 = result[2];
    }
    console.log(petsAll)

    console.log((currentPage-1)*cntCards, (currentPage)*cntCards);
    addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), startPos, cntCards);
}

init()

function buttonLeftPress(){
    if (currentPage > 1){
        const startPos = 0;
        const cntCards = 8;
        currentPage--;
        // console.log((currentPage-1)*cntCards, (currentPage)*cntCards);
        addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), startPos, cntCards);
        PAGE_NUMBER.textContent = currentPage;
        if (currentPage == 1){
            BUTTON_LEFT.classList.remove("next-item")
            BUTTON_LEFT.classList.add("inactive-item")
            BUTTON_LEFT2.classList.remove("next-item")
            BUTTON_LEFT2.classList.add("inactive-item")
        }
        if (currentPage <= pagesCnt){
            BUTTON_RIGHT.classList.add("next-item")
            BUTTON_RIGHT.classList.remove("inactive-item")
            BUTTON_RIGHT2.classList.add("next-item")
            BUTTON_RIGHT2.classList.remove("inactive-item")
        }
    }
}

function buttonRightPress(){
    if (currentPage < 6){
        const startPos = 0;
        const cntCards = 8;
        currentPage++;
        // console.log((currentPage-1)*cntCards, (currentPage)*cntCards);
        addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), startPos, cntCards);
        PAGE_NUMBER.textContent = currentPage;
        if (currentPage > 1){
            BUTTON_LEFT.classList.add("next-item")
            BUTTON_LEFT.classList.remove("inactive-item")
            BUTTON_LEFT2.classList.add("next-item")
            BUTTON_LEFT2.classList.remove("inactive-item")
        }
        if (currentPage == pagesCnt){
            BUTTON_RIGHT.classList.remove("next-item")
            BUTTON_RIGHT.classList.add("inactive-item")
            BUTTON_RIGHT2.classList.remove("next-item")
            BUTTON_RIGHT2.classList.add("inactive-item")
        }
    }
}

BUTTON_LEFT.addEventListener("click", buttonLeftPress)
BUTTON_RIGHT.addEventListener("click", buttonRightPress)
