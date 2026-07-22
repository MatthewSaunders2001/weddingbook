import couple from "../prompts/couple";
import guests from "../prompts/guests";
import details from "../prompts/details";
import venue from "../prompts/venue";
import fun from "../prompts/fun";

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateWeddingBook() {
  return [
    randomItem(couple),
    randomItem(couple),

    randomItem(guests),
    randomItem(guests),

    randomItem(details),
    randomItem(details),

    randomItem(venue),
    randomItem(venue),

    randomItem(fun),
    randomItem(fun),
  ];
}