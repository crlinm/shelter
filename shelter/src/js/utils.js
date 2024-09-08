
export async function getPets(){
    const res = await fetch("src/js/pets.json");
    
    if (res.ok){
        const cardPets = await res.json();
        return cardPets;
    } else {
        throw "failed fetch pets.json";
    }
}

function randomIndex(minInd, maxInd){
    return Math.floor(Math.random()*(maxInd - minInd) + minInd);
}

export function generatePetsOrder(petsPage, cntCards) {
    let minInd = 0;
    const maxInd = petsPage.length;

    while (minInd < cntCards){
        let randomInd = randomIndex(minInd, maxInd);
        const temp = petsPage[minInd];
        petsPage[minInd] = petsPage[randomInd];
        petsPage[randomInd] = temp;
        minInd++;
    }

    return petsPage;
}

export function generateSliderOrderI(current, previous, cntCards) {
    let rest = Array.from({length: 8}, (v, i) => i);
    for (let cur of current){
        const index = rest.indexOf(cur);
        rest.splice(index, 1);
    }
    previous = current;
    
    let minInd = 0;
    while (minInd < cntCards){
        let randomInd = randomIndex(minInd, rest.length);
        const temp = rest[minInd];
        rest[minInd] = rest[randomInd];
        rest[randomInd] = temp;
        minInd++;
    }
    current = rest.slice(0, cntCards);
    const result = [current, previous];
    return result;
}

export function generatePetsOrderI(rest8, rest6) {
    if (rest8.length == 0) {
        rest8 = Array.from({length: 8}, (v, i) => i);
    }
    if (rest6.length <= 2) {
        rest6 = Array.from({length: 8}, (v, i) => i);
    }

    let minInd = 0;

    let intersection = rest8.filter(x => rest6.includes(x));

    let randomInd = randomIndex(minInd, intersection.length);
    const temp = intersection[randomInd];

    const index8 = rest8.indexOf(temp);
    rest8.splice(index8, 1);
    const index6 = rest6.indexOf(temp);
    rest6.splice(index6, 1);

    const result = [temp, rest8, rest6];
    return result;
}
