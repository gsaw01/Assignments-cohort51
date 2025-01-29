export function rollDie() {
  return new Promise((resolve, reject) => {
    const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
    console.log(`Die scheduled for ${randomRollsToDo} rolls...`);

    const rollOnce = (roll) => {
      const value = Math.floor(Math.random() * 6) + 1;
      console.log(`Die value is now: ${value}`);

      if (roll >= 6) {
        reject(new Error('Oops... Die rolled off the table.'));
        return;
      }

      if (roll === randomRollsToDo) {
        resolve(value);
      }

      if (roll < randomRollsToDo) {
        setTimeout(() => rollOnce(roll + 1), 500);
      }
    };

    rollOnce(1);
  });
}

function main() {
  rollDie()
    .then((value) => console.log(`Success! Die settled on ${value}.`))
    .catch((error) => console.log(error.message));
}

if (process.env.NODE_ENV !== 'test') {
  main();
}

// The initial version of code had three problems:
// -- the die would continue rolling even after falling off the table.
// -- we would see both success and error messages
// -- falling from table happens after 7th throw, not after 6th.
//
// Rewriting the code using promises solved only the second problem.
// Yes, promises guarantee that calls will be resolved or rejected
// only once, so subsequent calls will be ignored. But it's not enough,
// as function continues executing even after reject(), which is illogical
// for a die that has fallen off the table. So we have
// to use 'return' after reject() to stop further execution.

// I have also changed condition 'if (roll > 6)' to if '(roll >= 6)',
// so we check if next roll would exceed 6 before scheduling it. Otherwise
// die rolls of the table only after 7 throws.