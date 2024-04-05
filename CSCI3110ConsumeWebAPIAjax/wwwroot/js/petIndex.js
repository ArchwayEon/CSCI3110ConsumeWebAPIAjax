"use strict";

import { PetRepository } from "./PetRepository.js";

const petTableBody = document.querySelector("#petTableBody");

const petRepo = new PetRepository("https://localhost:7219/api/pet");
let pets = await petRepo.readAll();
pets.forEach((pet) => {
    petTableBody.appendChild(createTRForPet(pet));
});

function createTRWithLoadingGIF() {
    const tr = document.createElement("tr");
}

function createTRForPet(pet) {
    const tr = document.createElement("tr");
    tr.appendChild(createTD(pet.id));
    tr.appendChild(createTD(pet.name));
    tr.appendChild(createTD(pet.weight));
    tr.appendChild(createTDWithLinks(pet.id))
    return tr;
}

function createTD(text) {
    const td = document.createElement("td");
    td.appendChild(document.createTextNode(text));
    return td;
}

function createTDWithLinks(id) {
    const td = document.createElement("td");
    td.appendChild(createLink(`/pet/edit/${id}`, "Edit"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/pet/details/${id}`, "Details"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(createLink(`/pet/delete/${id}`, "Delete"));
    return td;
}

function createLink(url, text) {
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.appendChild(document.createTextNode(text));
    return a;
}
