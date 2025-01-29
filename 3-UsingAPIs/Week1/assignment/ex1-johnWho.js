export const getAnonName = (firstName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (firstName) {
        resolve(`${firstName} Doe`);
      } else {
        reject(new Error(`You didn't pass in a first name!`));
      }
    }, 1000);
  });
};

function main() {
  getAnonName('John')
    .then((response) => console.log(response))
    .catch((error) => console.error(error.message));
}

if (process.env.NODE_ENV !== 'test') {
  main();
}
