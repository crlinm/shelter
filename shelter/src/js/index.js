import {getPets, generatePetsOrder} from "./utils.js"
import {Pet} from './Pet.js';


const BUTTON_LEFT = document.querySelector(".left-arrow");
const BUTTON_RIGHT = document.querySelector(".right-arrow");
const PETS_LIST_MAIN = document.querySelector(".friends-slider-list")

// const widthPetsList = document.querySelector(".friends-slider-list").clientWidth;

let pets;
let current = [];
let previous;
let rest;


// function generatePetsOrderMain(cntCards, cntPets) {
//     let minInd = 0;
//     const maxInd = rest.length;

//     while (minInd < cntCards){
//         let randomInd = randomIndex(minInd, maxInd);
//         const temp = rest[minInd];
//         rest[minInd] = rest[randomInd];
//         rest[randomInd] = temp;
//         minInd++;
//     }

//     console.log('previous, current, rest before: ', previous, current, rest);
//     previous = current;
//     current = rest.slice(0, cntCards);
//     rest = rest.slice(cntCards, cntPets).concat(previous);
//     console.log('previous, current, rest after: ', previous, current, rest);
// }

function addRandomPets(current, startPos, cntCards){
    for (let i of current.slice(startPos, cntCards)){
        const petCard = pets[i].createPet();
        PETS_LIST_MAIN.append(petCard);
    }
}

// function newSliderPets(){
//     const cntCards = 3;
//     const startPos = 0;
//     const cntPets = pets.length;
//     generatePetsOrderMain(cntCards, cntPets);
//     console.log('current, startPos, cntCards', current, startPos, cntCards);

//     addRandomPets(startPos, cntCards);
//     PETS_LIST_MAIN.classList.add("transition-right");
// }

const generatePets = (data) => data.map(pet => new Pet(pet));

async function init(){
    const data = await getPets();
    const cntPets = data.length;
    pets = generatePets(data);

    const cntCards = 3;
    const startPos = 0;
    rest = Array.from({length: cntPets}, (v, i) => i);

    rest = generatePetsOrder(rest, cntCards);
    console.log('previous, current, rest before: ', previous, current, rest);
    previous = current;
    current = rest.slice(0, cntCards);
    rest = rest.slice(cntCards, cntPets).concat(previous);
    console.log('previous, current, rest after: ', previous, current, rest);

    addRandomPets(current, startPos, cntCards);
}

init();

// BUTTON_RIGHT.addEventListener("click", newSliderPets);
PETS_LIST_MAIN.addEventListener("animationend", () => {
    PETS_LIST_MAIN.classList.remove("transition-right");
})
