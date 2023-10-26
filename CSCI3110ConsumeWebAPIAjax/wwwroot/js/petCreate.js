"use strict";

import { create } from "./petRepository.js";

const petCreateForm = document.querySelector("#formCreatePet");
petCreateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(petCreateForm);
    const result = await create(formData);
    console.log(result);
    window.location.replace("/pet/index");
});
