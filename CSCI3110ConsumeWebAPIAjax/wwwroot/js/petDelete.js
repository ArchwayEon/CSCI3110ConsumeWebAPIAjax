"use strict";

import { PetRepository } from "./PetRepository.js";
import { DOM } from "./DOMCreator.js";

const petRepo = new PetRepository("https://localhost:7219/api/pet");

const petHeading = document.querySelector("#petHeading");
DOM.removeChildren(petHeading);
petHeading.appendChild(document.createTextNode("Loading..."));

const urlSections = window.location.href.split("/");
const petId = urlSections[5];
await populatePetData();
const formPetDelete = document.querySelector("#formPetDelete");
formPetDelete.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formPetDelete);

    try {
        await petRepo.deletePet(formData.get("id"));
        window.location.replace("/pet/index/");
    }
    catch (error) {
        console.log(error);
    }
});

async function populatePetData() {
    try {
        const pet = await petRepo.read(petId);
        DOM.setElementText("#petId", pet.id);
        DOM.setElementText("#petName", pet.name);
        DOM.setElementText("#petWeight", pet.weight);
        DOM.setElementValue("#id", pet.id);

        DOM.removeChildren(petHeading);
        petHeading.appendChild(document.createTextNode("Pet"));
    }
    catch (error) {
        console.log(error);
        window.location.replace("/pet/index");
    }
}

