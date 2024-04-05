"use strict";

import { PetRepository } from "./PetRepository.js";
import { DOMCreator } from "./DOMCreator.js";

const petRepo = new PetRepository("https://localhost:7219/api/pet");
const domCreator = new DOMCreator();

const urlSections = window.location.href.split("/");
const petId = urlSections[5];
try {
    const pet = await petRepo.read(petId);
    console.log(pet);

    domCreator.setElementText("#petId", pet.id);
    domCreator.setElementText("#petName", pet.name);
    domCreator.setElementText("#petWeight", pet.weight);
}
catch (error) {
    console.log(error);
    window.location.replace("/pet/index");
}

