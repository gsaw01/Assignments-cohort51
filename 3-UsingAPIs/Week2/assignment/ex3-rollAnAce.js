import { rollDie } from '../../helpers/pokerDiceRoller.js';
/** @import {DieFace} from "../../helpers/pokerDiceRoller.js" */

/**
 * Rolls a die until the desired value is rolled.
 * @param {DieFace} desiredValue
 * @returns {Promise<DieFace>}
 */
export async function rollDieUntil(desiredValue) {
  while (true) {
    const value = await rollDie();
    if (value === desiredValue) return value;
  }
}

async function main() {
  try {
    const results = await rollDieUntil('ACE');
    console.log('Resolved!', results);
  } catch (error) {
    console.log('Rejected', error.message);
  }
}

if (process.env.NODE_ENV !== 'test') {
  main();
}
