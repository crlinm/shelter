import {getPets, generatePetsOrder, generateSliderOrderI} from "./utils.js"
import {Pet} from './Pet.js';


const BUTTON_LEFT = document.querySelector(".left-arrow");
const BUTTON_RIGHT = document.querySelector(".right-arrow");
const PETS_LIST_MAIN = document.querySelector(".friends-slider");
const MENU_ICON = document.querySelector(".burger-menu")


let pets;
let current = [];
let previous;
let cntCardsShow = 3;
let cntCardsFix = 3;
let w;
let lastDirection = '';
let currentNode;


function addRandomPets(current, cntCardsShow, direction){
    const active = document.createElement("div");
    active.classList.add("friends-slider-pack");
    active.classList.add("pack-"+direction);
    
    const previousNode = currentNode;
    if (direction == 'left'){
        active.style.left = "100%";
        if (previousNode){
            previousNode.style.left = "-110%";
        }
    } else {
        active.style.left = "-100%";
        if (previousNode){
            previousNode.style.left = "110%";
        }
    }
    for (let i of current.slice(0, cntCardsShow)){
        const petCard = pets[i].createPet();
        active.append(petCard);
    }
    
    currentNode = active;
    if (previousNode){
        setTimeout(() => {
            PETS_LIST_MAIN.removeChild(previousNode);
        }, 1000);
    }

    PETS_LIST_MAIN.append(active);

    setTimeout(() => {
        active.style.left = 0;
    }, 0);
}

function newSliderPets(direction){
    refreshCardCnt();

    if (direction == lastDirection || lastDirection == ''){
        const result = generateSliderOrderI(current, previous, cntCardsFix);
        current = result[0];
        previous = result[1];
    } else {
        const temp = previous;
        previous = current;
        current = temp;
    }
    lastDirection = direction;

    addRandomPets(current, cntCardsFix, direction);
}

const generatePets = (data) => data.map(pet => new Pet(pet));

async function init(){
    const data = await getPets();
    const cntPets = data.length;
    pets = generatePets(data);

    newSliderPets('');
}

init();

BUTTON_RIGHT.addEventListener("click", () => newSliderPets('right'));
BUTTON_LEFT.addEventListener("click", () => newSliderPets('left'));


MENU_ICON.addEventListener("click", () => {
    MENU_ICON.classList.toggle("active-burger-icon")
})


window.addEventListener("resize", () => {
    refreshCardCnt();

    for (let i=0; i<cntCardsShow; i++) {
        currentNode.children.item(i).classList.remove("hide");
    }
    for (let i=cntCardsShow; i<current.length; i++) {
        currentNode.children.item(i).classList.add("hide");
    }
})


function refreshCardCnt(){
    // const w = window.innerWidth;
    w = document.documentElement.clientWidth;

    if (w >= 1270) {
        cntCardsShow = 3;
    }
    else if (w < 1270 && w > 780) {
        cntCardsShow = 2;
    } else {
        cntCardsShow = 1;
    }
}