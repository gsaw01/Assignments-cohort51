async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP Error. Status: ${response.status}`);
  return response.json();
}

function renderLaureate({ knownName, birth, death }) {
  console.log(`\nName: ${knownName.en}`);
  console.log(`Birth: ${birth.date}, ${birth.place.locationString.en}`);
  if (death) {
    console.log(`Death: ${death.date}, ${death.place.locationString.en}`);
  }
}

function renderLaureates(laureates) {
  laureates.forEach(renderLaureate);
}

async function fetchAndRender() {
  try {
    const { laureates } = await getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    renderLaureates(laureates);
  } catch (error) {
    console.error(error.message);
  }
}

fetchAndRender();
