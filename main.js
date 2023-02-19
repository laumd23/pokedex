const root = document.getElementById('root');

const containerOne = document.createElement('div');
containerOne.setAttribute('class', 'containerScreen');
root.appendChild(containerOne);

const containerTwo = document.createElement('div');
containerTwo.setAttribute('class', 'containerKeys');
root.appendChild(containerTwo);

const myScreen = document.createElement('div');
myScreen.setAttribute('class', 'screen');
containerOne.appendChild(myScreen);

const input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('class', 'input');
containerTwo.appendChild(input);
// input.disabled = true;

const numberKey = document.createElement('div');
numberKey.setAttribute('class', 'numberKey');
containerTwo.appendChild(numberKey);

const keyboard = document.createElement('div');
keyboard.setAttribute('class', 'keyboard');
containerTwo.appendChild(keyboard);

const arrayNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

arrayNumber.forEach(numbers => {
  const number = document.createElement('div');
  number.setAttribute('class', 'number');
  numberKey.appendChild(number);
  number.innerHTML = numbers;

  number.addEventListener('click', () => {
    if (number === number) {
      input.value = input.value + numbers;
    }
  });
});

const arrayLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Back', 'Enter', 'Delete'];

arrayLetters.forEach(key => {
  const letter = document.createElement('div');
  letter.setAttribute('class', 'letter');
  keyboard.appendChild(letter);
  letter.innerHTML = key;

  if (key === 'Enter') {
    letter.setAttribute('id', 'enter');
  }

  letter.addEventListener('click', async () => {
    if (key === 'Enter') {
      // eslint-disable-next-line no-self-assign
      input.value = input.value;
      const pokemonPromise = await pokemon(input.value);
      getPokemon(pokemonPromise);
    } else if (key === 'Delete') {
      letter.setAttribute('id', 'delete');
      input.value = '';

      remove();

    } else if (key === 'Back') {
      input.value = input.value.slice(0, -1);

    } else {
      input.value = input.value + key;
    }
  });
});

function remove() {
  const images = document.getElementById('imageId');
  const names = document.getElementById('name');

  if (images && names) {
    myScreen.removeChild(images);
    myScreen.removeChild(names);
  }
}

async function pokemon(idOrName) {
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    const responseJson = await response.json();
    return responseJson;
  }
  catch(error) {
    console.error('Mira este error', error);
  }
}

const getPokemon = data => {
  remove();

  if (input.value) {
    const image = document.createElement('img');
    image.setAttribute('class', 'image');
    image.id = 'imageId';
    image.src = data.sprites.other.dream_world.front_default;
    myScreen.appendChild(image);

    const pokemonName = document.createElement('h2');
    pokemonName.setAttribute('class', 'name');
    pokemonName.id = 'name';
    pokemonName.innerHTML = data.name.toUpperCase();
    myScreen.appendChild(pokemonName);
  }
};