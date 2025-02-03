async function requestData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data. Status: ${response.status}`);
  return response.json();
}

function renderImage(data) {
  const imageElement = document.createElement('img');
  imageElement.src = data.img;
  document.body.append(imageElement);
}

function renderError(error) {
  const errorElement = document.createElement('h1');
  errorElement.textContent = `Error: ${error.message}`;
  document.body.append(errorElement);
}

async function main() {
  try {
    const data = await requestData('https://xkcd.vercel.app/?comic=latest')
    renderImage(data);
  } catch (error) {
    renderError(error);
  }
}

window.addEventListener('load', main);
