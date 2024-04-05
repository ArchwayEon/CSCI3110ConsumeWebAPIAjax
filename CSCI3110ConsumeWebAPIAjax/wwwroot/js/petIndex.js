"use strict";

import { PetRepository } from "./PetRepository.js";
import { DOMCreator } from "./DOMCreator.js";

const petRepo = new PetRepository("https://localhost:7219/api/pet");
const domCreator = new DOMCreator();

const petTableBody = document.querySelector("#petTableBody");
petTableBody.appendChild(domCreator.createImageTR("/images/ajax-loader.gif", "Loading image"));

let pets = await petRepo.readAll();
domCreator.removeChildren(petTableBody);
pets.forEach((pet) => {
    petTableBody.appendChild(createPetTR(pet));
});

function createPetTR(pet) {
    const tr = document.createElement("tr");
    tr.appendChild(domCreator.createTextTD(pet.id));
    tr.appendChild(domCreator.createTextTD(pet.name));
    tr.appendChild(domCreator.createTextTD(pet.weight));
    tr.appendChild(createTDWithLinks(pet.id))
    return tr;
}

function createTDWithLinks(id) {
    const td = document.createElement("td");
    td.appendChild(domCreator.createTextLink(`/pet/edit/${id}`, "Edit"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(domCreator.createTextLink(`/pet/details/${id}`, "Details"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(domCreator.createTextLink(`/pet/delete/${id}`, "Delete"));
    return td;
}

