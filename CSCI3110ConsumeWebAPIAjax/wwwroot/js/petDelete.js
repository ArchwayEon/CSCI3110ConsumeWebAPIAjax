"use strict";

import { read, deletePet } from "./petRepository.js";

const petHeading = document.querySelector("#petHeading");
removeChildren(petHeading);
petHeading.appendChild(document.createTextNode("Loading..."));

const urlSections = window.location.href.split("/");
const petId = urlSections[5];
await populatePetData();
const formPetDelete = document.querySelector("#formPetDelete");
formPetDelete.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formPetDelete);

    try {
        await deletePet(formData.get("id"));
        window.location.replace("/pet/index/");
    }
    catch (error) {
        console.log(error);
    }
});

async function populatePetData() {
    try {
        const pet = await read(petId);
        setText("#petId", pet.id);
        setText("#petName", pet.name);
        setText("#petWeight", pet.weight);
        setValue("#id", pet.id);

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
    element.appendChild(document.createTextNode(text));
}

function setValue(elementId, text) {
    const element = document.querySelector(elementId);
    element.value = text;
}
