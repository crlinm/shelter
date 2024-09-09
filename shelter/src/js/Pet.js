const popupCard = document.querySelector(".pop-up-card");
popupCard.addEventListener("click", (e) => popupClose(e));

function popupClose(event){
    // console.log(event.target, event.currentTarget)
    // if (event.target.classList.contains("pop-up-card")){
    if (event.target == event.currentTarget){
        popupCard.classList.toggle("hidden");
        document.body.classList.toggle("shadow");
    }
}

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
        // card.classList.add("hide");
        
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
        const span1 = document.createElement('span');
        span1.append(bAge, this.age);
        liAge.append(span1);
    
        const liInoculations = document.createElement("li");
        const bInoculations = document.createElement("b");
        bInoculations.textContent = 'Inoculations: ';
        const span2 = document.createElement('span');
        span2.append(bInoculations, this.inoculations);
        liInoculations.append(span2);
    
        const liDiseases = document.createElement("li");
        const bDiseases = document.createElement("b");
        bDiseases.textContent = 'Diseases: ';
        const span3 = document.createElement('span');
        span3.append(bDiseases, this.diseases);
        liDiseases.append(span3);
        // liDiseases.innerHTML = '<b>Diseases: </b>' + this.diseases;
    
        const liParasites = document.createElement("li");
        const bParasites = document.createElement("b");
        bParasites.textContent = 'Parasites: ';
        const span4 = document.createElement('span');
        span4.append(bParasites, this.parasites);
        liParasites.append(span4);
    
        ulDesc.append(liAge, liInoculations, liDiseases, liParasites);
    
        descriptionPet.append(petTitle, pBreed, pDescription, ulDesc);

        const btnClose = document.createElement('div');
        btnClose.classList.add("popup-btn-close");
        // btnClose.innerHTML = "<div>×</div>";

        const svgStr = `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="50" height="50" rx="25" stroke="#F1CDB3" stroke-width="2" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4262 26L31.7046 21.7216C32.0985 21.3277 32.0985 20.6892 31.7046 20.2954C31.3108 19.9016 30.6723 19.9016 30.2785 20.2954L26 24.5739L21.7215 20.2954C21.3276 19.9015 20.6892 19.9015 20.2953 20.2954C19.9016 20.6892 19.9016 21.3277 20.2953 21.7215L24.5738 26L20.2953 30.2785C19.9016 30.6723 19.9016 31.3108 20.2953 31.7046C20.6892 32.0985 21.3276 32.0985 21.7215 31.7046L26 27.4261L30.2785 31.7046C30.6723 32.0985 31.3108 32.0985 31.7046 31.7046C32.0985 31.3108 32.0985 30.6723 31.7046 30.2785L27.4262 26Z" fill="#292929" />
        </svg>`;
        btnClose.innerHTML = svgStr;
    
        popupContent.append(imgPopup, descriptionPet, btnClose);
    
        document.body.classList.toggle("shadow");

        const popupCross = document.querySelector(".popup-btn-close");

        popupCross.addEventListener("click", (event) => {
            popupCard.classList.toggle("hidden");
            document.body.classList.toggle("shadow");
        });

        return popupCard;
    }
}