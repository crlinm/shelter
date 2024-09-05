
export async function getPets(){
    const res = await fetch("src/js/pets.json");
    console.log(res);
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
