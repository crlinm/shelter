const popupCard = document.querySelector(".pop-up-card");


export class Pet {
    constructor ({name, img, type, breed, description, age, inoculations, diseases, parasites}){
        this.name = name;
        this.img = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;
    }
    
    createPet(){
        const card = document.createElement('div');
        card.classList.add("our-friends-slider-card");
        card.classList.add("hide");
        
        const img = document.createElement('img');
        img.alt = '';
        img.src = this.img;
    
        const name = document.createElement('div');
        name.classList.add("our-friends-pet-name");
        name.textContent = this.name;
    
        const btn = document.createElement('div');
        btn.classList.add("learn-more-btn");
        btn.textContent = "Learn more";
    
        card.append(img);
        card.append(name);
        card.append(btn);
    
        card.addEventListener("click", (e) => this.fillPopup());
    
        popupCard.addEventListener("click", (e) => this.popupClose(e));
    
        // PETS_LIST_MAIN.append(card);
        return card;
    }

    fillPopup(){
        popupCard.classList.toggle("hidden");
        
        const popupContent = document.querySelector('.pop-up__content');
        popupContent.textContent = '';
    
        const imgPopup = document.createElement('img');
        imgPopup.alt = '';
        imgPopup.src = this.img;
    
        const descriptionPet = document.createElement('div');
        descriptionPet.classList.add("description-pet");
    
        const petTitle = document.createElement('h3');
        petTitle.classList.add('pet-title');
        petTitle.textContent = this.name;
    
        const pBreed = document.createElement('p');
        pBreed.classList.add('breed');
        pBreed.textContent = this.type + " - " + this.breed;
    
        const pDescription = document.createElement('p');
        pDescription.classList.add('description');
        pDescription.textContent = this.description;
    
        const ulDesc = document.createElement("ul");
    
        const liAge = document.createElement("li");
        const bAge = document.createElement("b");
        bAge.textContent = 'Age: ';
        liAge.append(bAge, this.age);
    
        const liInoculations = document.createElement("li");
        const bInoculations = document.createElement("b");
        bInoculations.textContent = 'Inoculations: ';
        liInoculations.append(bInoculations, this.inoculations);
    
        const liDiseases = document.createElement("li");
        const bDiseases = document.createElement("b");
        bDiseases.textContent = 'Diseases: ';
        liDiseases.append(bDiseases, this.diseases);
        // liDiseases.innerHTML = '<b>Diseases: </b>' + this.diseases;
    
        const liParasites = document.createElement("li");
        const bParasites = document.createElement("b");
        bParasites.textContent = 'Parasites: ';
        liParasites.append(bParasites, this.parasites);
    
        ulDesc.append(liAge, liInoculations, liDiseases, liParasites);
    
        descriptionPet.append(petTitle, pBreed, pDescription, ulDesc);
    
        popupContent.append(imgPopup, descriptionPet);
    
        document.body.classList.toggle("shadow");

        return popupCard;
    }

    popupClose(event){
        if (event.target.classList.contains("pop-up-card")){
            popupCard.classList.toggle("hidden");
            document.body.classList.toggle("shadow");
        }
    }
}