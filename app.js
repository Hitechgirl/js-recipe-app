const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemGrid');

const recipesList = document.getElementById('recipesList');
const resetBtn = document.getElementById('resetBtn');
const searchRecipeBtn = document.getElementById('searchRecipeBtn');
const inputField = document.getElementById('inputField');

const APP_ID = '14494e99';
const APP_KEY = '326753c7d2788295f7e0e911fcf5fdf7';
let inputValue = '';


inputField.addEventListener('change', (e) => {
    inputValue = e.target.value;
    console.log(inputValue);
});

addItemBtn.addEventListener('click', addItem);

searchRecipeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    recipesList.innerHTML = null;
    void getRecipes(inputField.value)
    inputField.value = '';
    getRecipes();
});

resetBtn.addEventListener('click', () => {
    recipesList.innerHTML = '';
    inputField.value = '';
}
);

function addItem() {
    const newItemText = itemInput.value.trim();
    if (newItemText !== '') {
        const li = document.createElement('li');
        li.textContent = newItemText;
        itemList.appendChild(li);
        itemInput.value = '';
    }
}

function getRecipes() {
    fetch(`https://api.edamam.com/search?q=${inputValue}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const recipes = data.hits.slice(0, 4);
            recipes.forEach(item => {
                const { label, url, image } = item.recipe;
                const recipeItem = document.createElement('div');
                const imageElement = document.createElement('img');
                imageElement.src = image;
                recipeItem.appendChild(imageElement);
                const recipeLink = document.createElement('a');
                recipeLink.classList.add('link');
                recipeLink.href = url;
                recipeLink.textContent = label;
                recipeItem.appendChild(recipeLink);
                recipesList.appendChild(recipeItem);
            });
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

resetBtn.addEventListener('click', () => {
    recipesList.innerHTML = '';
    inputField.value = '';
});
