"use strict";

import { PetRepository } from "./PetRepository.js";

const petRepo = new PetRepository("https://localhost:7219/api/pet");

const petCreateForm = document.querySelector("#formCreatePet");
petCreateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(petCreateForm);
    const result = await petRepo.create(formData);
    console.log(result);
    window.location.replace("/pet/index");
});
