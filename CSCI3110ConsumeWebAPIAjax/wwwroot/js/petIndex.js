"use strict";

import { PetRepository } from "./PetRepository.js";
import { DOM } from "./DOMCreator.js";

const petRepo = new PetRepository("https://localhost:7219/api/pet");

const petTableBody = document.querySelector("#petTableBody");
petTableBody.appendChild(DOM.createImageTR("/images/ajax-loader.gif", "Loading image"));

let pets = await petRepo.readAll();
DOM.removeChildren(petTableBody);
pets.forEach((pet) => {
    petTableBody.appendChild(createPetTR(pet));
});

function createPetTR(pet) {
    const tr = document.createElement("tr");
    tr.appendChild(DOM.createTextTD(pet.id));
    tr.appendChild(DOM.createTextTD(pet.name));
    tr.appendChild(DOM.createTextTD(pet.weight));
    tr.appendChild(createTDWithLinks(pet.id))
    return tr;
}

function createTDWithLinks(id) {
    const td = document.createElement("td");
    td.appendChild(DOM.createTextLink(`/pet/edit/${id}`, "Edit"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(DOM.createTextLink(`/pet/details/${id}`, "Details"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(DOM.createTextLink(`/pet/delete/${id}`, "Delete"));
    return td;
}

