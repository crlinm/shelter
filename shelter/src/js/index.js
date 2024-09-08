import {getPets, generatePetsOrder, generateSliderOrderI} from "./utils.js"
import {Pet} from './Pet.js';


const BUTTON_LEFT = document.querySelector(".left-arrow");
const BUTTON_RIGHT = document.querySelector(".right-arrow");
const PETS_LIST_MAIN = document.querySelector(".friends-slider-list")
const MENU_ICON = document.querySelector(".burger-menu")

// let widthPetsList = document.querySelector(".friends-list__container").clientWidth;

let pets;
let current = [];
let previous;
let cntCards = 3;
let w;


function addRandomPets(current){
    PETS_LIST_MAIN.textContent = '';
    for (let i of current.slice(0, cntCards)){
        const petCard = pets[i].createPet();
        PETS_LIST_MAIN.append(petCard);
    }
}

function newSliderPets(){
    refreshCardCnt();

    const result = generateSliderOrderI(current, previous, cntCards);
    current = result[0]
    previous = result[1]

    addRandomPets(current, cntCards);
    // PETS_LIST_MAIN.classList.add("transition-right");
}

const generatePets = (data) => data.map(pet => new Pet(pet));

async function init(){
    const data = await getPets();
    const cntPets = data.length;
    pets = generatePets(data);

    refreshCardCnt();

    const result = generateSliderOrderI(current, previous, cntCards);
    current = result[0]
    previous = result[1]

    addRandomPets(current, cntCards);
}

init();

BUTTON_RIGHT.addEventListener("click", newSliderPets);
// PETS_LIST_MAIN.addEventListener("animationend", () => {
//     PETS_LIST_MAIN.classList.remove("transition-right");
// })

MENU_ICON.addEventListener("click", () => {
    MENU_ICON.classList.toggle("active-burger-icon")
})

window.addEventListener("resize", () => {
    refreshCardCnt();

    addRandomPets(current, cntCards);
})

function refreshCardCnt(){
    // const w = window.innerWidth;
    w = document.documentElement.clientWidth;

    if (w >= 1270) {
        cntCards = 3;
    }
    else if (w < 1270 && w > 780) {
        cntCards = 2;
    } else {
        cntCards = 1;
    }
}