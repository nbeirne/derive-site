const arr = [
  {id: 1, name: 'Alice', age: 29},
  {id: 2, name: 'Bobby Hadz', age: 30},
  {id: 3, name: 'Carl', age: 31},
];

async function getPrompts() {
  const response = await fetch(
    './prompts.json',
    {
      mode: 'cors',
      method: 'GET',
    },
  );
  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const data = await response.json();
  return data["prompts"].concat(data["web"])
}

const prompts = getPrompts()

function newPrompt() {
  prompts.then(data => {
    var item = data[Math.floor(Math.random()*data.length)];


    const preElement = document.getElementById('prompt-data');
    preElement.innerHTML = item.text;
  })
}


function fillList() {
  function createListItem(item) {
    const li = document.createElement('li');
    li.innerHTML = item.text;
    return li;
  }
  prompts.then(data => {
    const preElement = document.getElementById('prompt-data');

    //preElement.style.fontSize = '18px';

    const ch = data.map(createListItem);
    const ul = document.createElement('ul');

    ch.forEach(child => {
      ul.appendChild(child);
    });

    preElement.appendChild(ul);
  })
}

fillList()

/*

*/
