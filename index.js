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

function randomPrompt(handler) {
  prompts.then(data => {
    var item = data[Math.floor(Math.random()*data.length)];
    handler(item);
  })
}

function showFullList() {
  function createListItem(item) {
    const li = document.createElement('li');
    li.innerHTML = item.text;
    return li;
  }

  prompts.then(data => {
    const preElement = document.getElementById('prompt-data');
    const ch = data.map(createListItem);
    const ul = document.createElement('ul');
    ch.forEach(child => {
      ul.appendChild(child);
    });
    preElement.appendChild(ul);
  })
}

function showRandomPicker() {
  prompts.then(_ => {
    const promptData = document.getElementById('prompt-data');
    const div = document.createElement('div');
    div.className = 'center';
    
    const promptText = document.createElement('div');
    promptText.style = 'font-weight: bold;';

    const btn = document.createElement('button');
    btn.className = "plausible-event-name=NewPrompt"
    btn.addEventListener('click', function() {
      randomPrompt(function(item) {
        promptText.innerHTML = item.text;
      });
    });
    btn.textContent = "New Prompt";

    div.appendChild(promptText);
    div.appendChild(btn);
    promptData.appendChild(div);
      randomPrompt(function(item) {
        promptText.innerHTML = item.text;
      });
  })
}

//showFullList()
showRandomPicker()
