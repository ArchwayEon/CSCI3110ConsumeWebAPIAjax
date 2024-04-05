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

    async read(id) {
        const address = `${this.#baseAddress}/one/${id}`;
        const response = await fetch(address);
        if (!response.ok) {
            throw new Error("There was an HTTP error getting the pet data.");
        }
        return await response.json();
    }

    async create(formData) {
        const address = `${this.#baseAddress}/create`;
        const response = await fetch(address, {
            method: "post",
            body: formData
        });
        if (!response.ok) {
            throw new Error("There was an HTTP error creating the pet data.");
        }
        return await response.json();
    }

    async update(formData) {
        const address = `${this.#baseAddress}/update`;
        const response = await fetch(address, {
            method: "put",
            body: formData
        });
        if (!response.ok) {
            throw new Error("There was an HTTP error updating the pet data.");
        }
        return await response.text();
    }
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

