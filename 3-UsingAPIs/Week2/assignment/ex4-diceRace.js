import { rollDie } from '../../helpers/pokerDiceRoller.js';
/** @import {DieFace} from "../../helpers/pokerDiceRoller.js" */

export function rollDice() {
  const dice = [1, 2, 3, 4, 5];
  const dicePromises = dice.map((die) => rollDie(die));
  return Promise.race(dicePromises);
}

// Refactor this function to use async/await and try/catch
async function main() {
  try {
    const results = await rollDice();
    console.log('Resolved!', results);
  } catch (error) {
    console.log('Rejected!', error.message);
  }
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}

// Although Promise.race() returns the first resolved promise, it doesn't
// stop other promises that already begun executing. That's why we see other
// dice continue rolling even after Promise.race() resolves.
