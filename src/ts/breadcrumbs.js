import axios from 'axios';

const filterItems = document.querySelector('.js-filter-items');
const cardList = document.querySelector('.exercise-cards-list');
const category = document.querySelector('.breadcrumbs-category');

filterItems.addEventListener('click', async event => {
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
  //   console.dir(categoryItem);
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

// const fetchAndRenderCategoryItems = async category => {
//   try {
//     const response = await fetchCategoryItemsByQuery(category);
//     const itemsArr = response.data;

//     // const itemsMarkup = exersicesCrdsTemplate(itemsArr);
//     const itemsContainer = document.querySelector('.exercise-cards-list');
//     // itemsContainer.innerHTML = itemsMarkup;
//   } catch (err) {
//     console.error(err);
//   }
// };

// const exersicesCrdsTemplate = itemsArr => {
//   return itemsArr.reduce((acc, el) => {
//     return (
//       acc +
//       `<li class="exercise-card">
//         <div class="exercise-card__heading">
//           <p class="exercise-badge">WORKOUT</p>
//           <span class="rating-wrapper">
//             <p class="exercise-rating">${el.rating}</p>
//             <svg class="icon fill-icon exercise-rating-icon" width="14" height="14">
//               <use href="/images/sprite.svg#icon-star"></use>
//             </svg>
//           </span>
//           <button class="exercise-card-btn" type="button">
//             Start
//             <svg class="icon fill-icon arrow-icon" width="16" height="16">
//               <use href="/images/sprite.svg#icon-arw-scroll"></use>
//             </svg>
//           </button>
//         </div>
//         <div class="exercise-card__main">
//           <div class="icon-runningman-bg">
//             <svg class="icon fill-icon icon-runningman" width="16" height="16">
//               <use href="/images/sprite.svg#icon-runningman"></use>
//             </svg>
//           </div>
//           <h3 class="exercise-card-title">${el.name}</h3>
//         </div>

//         <ul class="exercise-card__info">
//           <li class="exercise-card__info-item">
//             <span class="exercise-card__item-label">Burned calories:</span>
//             <span class="exercise-card__item-content">${el.burnedCalories}</span>
//           </li>
//           <li class="exercise-card__info-item">
//             <span class="exercise-card__item-label">Body part:</span>
//             <span class="exercise-card__item-content">${el.bodyPart}</span>
//           </li>
//           <li class="exercise-card__info-item">
//             <span class="exercise-card__item-label">Target:</span>
//             <span class="exercise-card__item-content">${el.target}</span>
//           </li>
//         </ul>
//       </li>`
//     );
//   }, '');
// };

// ===========================

// import { getExercises } from "@api/exersises.api";

// class Breadcrumbs {
//   constructor(config) {
//     this.config = config;
//     this.init();
//   }

//   init() {
//     // set default active filter, render it
//   }
// }

// class ExerciseCategories {
//   private containerElement: HTMLElement;
//   private category: string = '';

//   constructor(containerElement, category) {
//     this.containerElement = containerElement;
//     this.category = category;
//     this.loadData();
//   }

//   loadData() {
//     getExercises({

//     })
//   }
// }

// const config = {
//   filtersListElement,
//   displayCategoryElement,
//   searchElement
// }

// const breadcrumbs = new Breadcrumbs(config);

// const exerciseCategories = new ExerciseCategories(containerElement, breadcrumbs.getCategory());

// breadcrumbs.onFilterChange((category) => {
//   exerciseCategories.setCategory(category);
//   exerciseCategories.loadData();
//   breadcrumbs.setCategory(null);
// });

// exerciseCategories.onCategoryChange((category) => {
//   breadcrumbs.setCategory(category);
// });
