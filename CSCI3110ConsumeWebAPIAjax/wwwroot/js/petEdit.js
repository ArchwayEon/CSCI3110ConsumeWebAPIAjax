"use strict";

import { read, update } from "./petRepository.js";

const petHeading = document.querySelector("#petHeading");
removeChildren(petHeading);
petHeading.appendChild(document.createTextNode("Loading..."));

const urlSections = window.location.href.split("/");
const petId = urlSections[5];

await populatePetData();
const formPetEdit = document.querySelector("#formPetEdit");
formPetEdit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formPetEdit);
    try {
        await update(formData);
        window.location.replace("/pet/index/");
    }
    catch (error) {
        console.log(error);
    }
});

async function populatePetData() {

    try {
        const pet = await read(petId);
        console.log(pet);

        setText("#Id", pet.id);
        setText("#Name", pet.name);
        setText("#Weight", pet.weight);

        removeChildren(petHeading);
        petHeading.appendChild(document.createTextNode("Pet"));
    }
    catch (error) {
        console.log(error);
        window.location.replace("/pet/index");
    }
}


function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function setText(elementId, text) {
    const element = document.querySelector(elementId);
    element.value = text;
}
