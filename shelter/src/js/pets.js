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
    console.log('addRandomPets: current, cntCard', current, cntCards)
    for (let i of current.slice(0, cntCards)){
        const petCard = pets[i].createPet();
        PETS_LIST_MAIN.append(petCard);
    }
}

const generatePets = (data) => data.map(pet => new Pet(pet));

async function init(){
    const data = await getPets();
    cntPets = data.length*6;
    pets = generatePets(data);

    getCardCnt();
    pagesCnt = cntPets/cntCards;
    
    for (let i=0; i < cntPets; i++){ 
        const result = generatePetsOrderI(rest8, rest6);
        petsAll.push(result[0]);
        rest8 = result[1];
        rest6 = result[2];
    }

    console.log('petsAll: ', petsAll);
    // console.log((currentPage-1)*cntCards, (currentPage)*cntCards);
    addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), cntCards);
}

init()

function buttonLeftPress(){
    if (currentPage > 1){
        getCardCnt();
        pagesCnt = cntPets/cntCards;
        currentPage--;
        // console.log((currentPage-1)*cntCards, (currentPage)*cntCards);
        addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), cntCards);
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
    getCardCnt();
    pagesCnt = cntPets/cntCards;
    if (currentPage < pagesCnt){
        currentPage++;
        console.log('buttonRightPress:', (currentPage-1)*cntCards, (currentPage)*cntCards);
        addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), cntCards);
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

window.addEventListener("resize", () => {
    const w0 = window.clientWidth;
    const w = window.innerWidth;
    console.log('w0, w', w0, w);
    getCardCnt();
    console.log('resize, cntCards', cntCards);
    addRandomPets(petsAll.slice((currentPage-1)*cntCards, (currentPage)*cntCards), cntCards);
})



function getCardCnt(){
    const w = window.innerWidth;
    if (w >= 1200) {
        cntCards = 8;
    }
    else if (w < 1200 && w > 580) {
        cntCards = 6;
    } else {
        cntCards = 3;
    }
}