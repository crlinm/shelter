const BUTTON_LEFT = document.querySelector(".left-arrow");
const BUTTON_RIGHT = document.querySelector(".right-arrow");

const PETS_LIST_MAIN = document.querySelector(".friends-slider-list")
const petsCard = document.querySelector(".our-friends-slider-card")
const popupCard = document.querySelector(".pop-up-card");
const body = document.querySelector("body");
// const widthPetsList = document.querySelector(".friends-slider-list").clientWidth;

async function getPets(){
    const res = await fetch("src/js/pets.json");
    console.log(res);
    if (res.ok){
        const cardPets = await res.json();
        return cardPets;
    } else {
        throw "failed fetch pets.json";
    }
}

function createPet(pet){
    const card = document.createElement('div');
    card.classList.add("our-friends-slider-card");
    card.classList.add("hide");
    
    const img = document.createElement('img');
    img.alt = '';
    img.src = pet.img;

    const name = document.createElement('div');
    name.classList.add("our-friends-pet-name");
    name.textContent = pet.name;

    const btn = document.createElement('div');
    btn.classList.add("learn-more-btn");
    btn.textContent = "Learn more";

    card.append(img);
    card.append(name);
    card.append(btn);

    PETS_LIST_MAIN.append(card);
}

function randomIndex(minInd, maxInd){
    return Math.round(Math.random()*(maxInd - minInd) + minInd);
}

function generatePetsOrder(cntCards, cntPets) {
    let tempArray = Array.from({length: cntPets}, (v, i) => i);
    console.log(tempArray);

    let minInd = 0;
    const maxInd = cntPets-1;

    while (minInd < cntCards){
        let randomInd = randomIndex(minInd, maxInd);
        console.log('randomInd', randomInd);
        const temp = tempArray[minInd];
        tempArray[minInd] = tempArray[randomInd];
        tempArray[randomInd] = temp;
        minInd++;
    }
    console.log('tempArray res: ', tempArray, tempArray.slice(0, 3), minInd, maxInd)
    return tempArray;
}

async function addRandomPet(){
    const pets = await getPets();
    const cntPets = pets.length;
    const cntCards = 3;
    let orderArray = generatePetsOrder(cntCards, cntPets);
    console.log(orderArray)
    for (let i of orderArray.slice(0, cntCards)){
        createPet(pets[i]);
    }
}

async function newSliderPets(){
    await addRandomPet();
    PETS_LIST_MAIN.classList.add("transition-right");
}

function getPetDescription(event){
    console.log(event, event.target, event.target.classList, event.target.parentNode);
    if (event.target.classList.contains("our-friends-slider-card") ||
        event.target.parentNode.classList.contains("our-friends-slider-card")){
        popupCard.classList.toggle("hidden");
    }
}

function popupClose(event){
    // body.classList.toggle("shadow");
    // console.log(body.clientHeight, body.offsetHeight)
    // if (event.target.classList.contains("pop-up-card") ||
    //     event.target.parentNode.classList.contains("pop-up-card")){
    if (event.target.classList.contains("pop-up-card")){
        popupCard.classList.toggle("hidden");
        body.classList.toggle("shadow");
    }
}   

async function init(){
    await addRandomPet();
}

init();

BUTTON_RIGHT.addEventListener("click", newSliderPets);
PETS_LIST_MAIN.addEventListener("animationend", () => {
    PETS_LIST_MAIN.classList.remove("transition-right");
})

petsCard.addEventListener("click", (e) => {
    popupCard.classList.toggle("hidden");
    body.classList.toggle("shadow");
    // console.log('generatePetsOrder', generatePetsOrder());
});

popupCard.addEventListener("click", popupClose);


