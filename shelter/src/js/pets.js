import {getPets} from "./utils.js"
import {Pet} from './Pet.js';

const PETS_LIST_MAIN = document.querySelector(".our-friends-pics-flex")

let pets;
let current = [];
let previous;
let rest;

function randomIndex(minInd, maxInd){
    return Math.floor(Math.random()*(maxInd - minInd) + minInd);
}

function generatePetsOrderMain(cntCards, cntPets) {
    let minInd = 0;
    const maxInd = rest.length;

    while (minInd < cntCards){
        let randomInd = randomIndex(minInd, maxInd);
        const temp = rest[minInd];
        rest[minInd] = rest[randomInd];
        rest[randomInd] = temp;
        minInd++;
    }

    console.log('previous, current, rest before: ', previous, current, rest);
    previous = current;
    current = rest.slice(0, cntCards);
    rest = rest.slice(cntCards, cntPets).concat(previous);
    console.log('previous, current, rest after: ', previous, current, rest);
}

async function addRandomPets(startPos, cntCards){
    for (let i of current.slice(startPos, cntCards)){
        const petCard = pets[i].createPet();
        PETS_LIST_MAIN.append(petCard);
    }
}

async function init(){
    const data = await getPets();
    const cntPets = data.length;
    pets = generatePets(data);

    const cntCards = 8;
    const startPos = 0;
    rest = Array.from({length: cntPets}, (v, i) => i);

    generatePetsOrderMain(cntCards, cntPets);

    await addRandomPets(startPos, cntCards);
}

init()

const generatePets = (data) => data.map(pet => new Pet(pet));