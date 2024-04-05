"use strict";

export class PetRepository {
    #baseAddress;
    constructor(baseAddress) {
        this.#baseAddress = baseAddress;
    }

    async readAll() {
        const address = `${this.#baseAddress}/all`;
        const response = await fetch(address);
        if (!response.ok) {
            throw new Error("There was an HTTP error getting the pet data.");
        }
        return await response.json();
    }
}

const baseAddress = "https://localhost:7219/api";

export async function readAll() {
    const address = `${baseAddress}/pet/all`;
    const response = await fetch(address);
    if (!response.ok) {
        throw new Error("There was an HTTP error getting the pet data.");
    }
    return await response.json();
}

export async function read(id) {
    const address = `${baseAddress}/pet/one/${id}`;
    const response = await fetch(address);
    if (!response.ok) {
        throw new Error("There was an HTTP error getting the pet data.");
    }
    return await response.json();
}

export async function create(formData) {
    const address = `${baseAddress}/pet/create`;
    const response = await fetch(address, {
        method: "post",
        body: formData
    });
    if (!response.ok) {
        throw new Error("There was an HTTP error creating the pet data.");
    }
    return await response.json();
}

export async function update(formData) {
    const address = `${baseAddress}/pet/update`;
    const response = await fetch(address, {
        method: "put",
        body: formData
    });
    if (!response.ok) {
        throw new Error("There was an HTTP error updating the pet data.");
    }
    return await response.text();
}

export async function deletePet(id) {
    const address = `${baseAddress}/pet/delete/${id}`;
    const response = await fetch(address, {
        method: "delete"
    });
    if (!response.ok) {
        throw new Error("There was an HTTP error deleting the pet data.");
    }
    return await response.text();
}

