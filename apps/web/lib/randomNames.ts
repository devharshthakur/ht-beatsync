/**
 * @module RandomNames
 * @description This module provides functions to generate random names using the Faker library.
 */


import { faker } from "@faker-js/faker";

/**
 * Generates a random name composed of an adjective and an animal type, separated by a hyphen.
 *
 * The generated name is converted to lowercase for uniformity.
 *
 * @returns {string} A randomly generated name in the format "adjective-animalType".
 */
export function generateName(): string {
  return `${faker.word.adjective()}-${faker.animal.type()}`.toLowerCase();
}