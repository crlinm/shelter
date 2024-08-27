const BUTTON_LEFT = document.querySelector(".left-arrow");
const BUTTON_RIGHT = document.querySelector(".right-arrow");

const PETS_LIST_MAIN = document.querySelector(".friends-slider-list")

async function getPets(){
    const res = await fetch("src/js/pets.json");
    console.log(res);
    if (res.ok){
        const cardPets = await res.json();
        return cardPets;
    } else {
        console.log("error");
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

async function addRandomPet(){
    const pets = await getPets();
    createPet(pets[3]);
    createPet(pets[4]);
    createPet(pets[5]);

    PETS_LIST_MAIN.classList.add("transition-right");
}

BUTTON_RIGHT.addEventListener("click", addRandomPet);
