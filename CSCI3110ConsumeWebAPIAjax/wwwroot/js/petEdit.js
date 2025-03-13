"use strict";

import { PetRepository } from "./PetRepository.js";
import { DOM } from "./DOMCreator.js";

const petRepo = new PetRepository("https://localhost:7219/api/pet");

const petHeading = document.querySelector("#petHeading");
DOM.removeChildren(petHeading);
petHeading.appendChild(
    DOM.createImg("/images/ajax-loader.gif", "Loading image"));

const urlSections = window.location.href.split("/");
const petId = urlSections[5];

await populatePetData();
const formPetEdit = document.querySelector("#formPetEdit");
formPetEdit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formPetEdit);
    try {
        await petRepo.update(formData);
        window.location.replace("/pet/index/");
    }
    catch (error) {
        console.log(error);
    }
});

async function populatePetData() {

    try {
        const pet = await petRepo.read(petId);
        console.log(pet);

        DOM.setElementValue("#Id", pet.id);
        DOM.setElementValue("#Name", pet.name);
        DOM.setElementValue("#Weight", pet.weight);

        DOM.removeChildren(petHeading);
        petHeading.appendChild(document.createTextNode("Pet"));
    }
    catch (error) {
        console.log(error);
        window.location.replace("/pet/index");
    }
}

