"use strict";

import { readAll } from "./petRepository.js";

let pets = await readAll();
const petTableBody = document.querySelector("#petTableBody");
pets.forEach((pet) => {
    petTableBody.appendChild(createTRForPet(pet));
});

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
