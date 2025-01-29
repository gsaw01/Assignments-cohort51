import { rollDie } from '../../helpers/pokerDiceRoller.js';

export function rollDice() {
  const dice = [1, 2, 3, 4, 5];
  const rollPromises = dice.map((die) => rollDie(die));
  return Promise.all(rollPromises);
}

function main() {
  rollDice()
    .then((results) => console.log('Resolved!', results))
    .catch((error) => console.log('Rejected!', error.message));
}

if (process.env.NODE_ENV !== 'test') {
  main();
}

// The described problem happens because even if Promise.all gets rejected,
// it doesn't cancel promises that have already begun executing. That's why
// we see that some dice continue to roll even in case of rejected Promise.