"use strict";

import { PetRepository } from "./PetRepository.js";
import { DOM } from "./DOMCreator.js";

const petRepo = new PetRepository("https://localhost:7219/api/pet");

const urlSections = window.location.href.split("/");
const petId = urlSections[5];
try {
    const pet = await petRepo.read(petId);
    console.log(pet);

    DOM.setElementText("#petId", pet.id);
    DOM.setElementText("#petName", pet.name);
    DOM.setElementText("#petWeight", pet.weight);
}
catch (error) {
    console.log(error);
    window.location.replace("/pet/index");
}

