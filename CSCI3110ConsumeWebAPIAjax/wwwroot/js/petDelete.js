"use strict";

import { PetRepository } from "./PetRepository.js";
import { DOMCreator } from "./DOMCreator.js";

const petRepo = new PetRepository("https://localhost:7219/api/pet");
const domCreator = new DOMCreator();

const petHeading = document.querySelector("#petHeading");
domCreator.removeChildren(petHeading);
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
        domCreator.setElementText("#petId", pet.id);
        domCreator.setElementText("#petName", pet.name);
        domCreator.setElementText("#petWeight", pet.weight);
        domCreator.setElementValue("#id", pet.id);

        domCreator.removeChildren(petHeading);
        petHeading.appendChild(document.createTextNode("Pet"));
    }
    catch (error) {
        console.log(error);
        window.location.replace("/pet/index");
    }
}

