import axios from 'axios';

const filterItems = document.querySelector('.js-filter-items');
const cardList = document.querySelector('.exercise-cards-list');
const category = document.querySelector('.breadcrumbs-category');

filterItems.addEventListener('click', async event => {
  category.textContent = '';
  if (event.target === event.currentTarget) {
    return;
  }

  const button = event.target;

  if (button) {
    const allButtons = filterItems.querySelectorAll('.js-filter-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');

    const category = button.dataset.category;

    const response = await fetchCategoryItemsByQuery(category);
    const categoriesArr = response.data.results;
    const markup = renderFunction(categoriesArr);
    cardList.innerHTML = markup;
  }
});

const onCardClick = event => {
  if (event.target === event.currentTarget) {
    return;
  }

  const searchCategory = event.target;
  const categoryItem = searchCategory.textContent;
  const capitalizedsearchCategory =
    categoryItem.charAt(0).toUpperCase() + categoryItem.slice(1);
  category.textContent = capitalizedsearchCategory;
};

cardList.addEventListener('click', onCardClick);

function renderFunction(arr) {
  return arr.reduce((acc, el) => {
    return (
      acc +
      `<div class="yellow-box">
    <button name="exampleButton">${el.name}</button>
  </div>`
    );
  }, '');
}

const fetchCategoryItemsByQuery = category => {
  const requestParams = {
    filter: category,
    page: 1,
    limit: 12,
  };

  return axios.get(`https://your-energy.b.goit.study/api/filters`, {
    params: requestParams,
  });
};
