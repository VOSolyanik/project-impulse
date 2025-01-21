import { getExercises } from '../api/exersises.api';
import { getFilters } from '../api/filters';
import { getQuoteOfTheDay } from '../api/quote.api';
import { BodyParts } from '../enums/bodyParts';
import { Equipment } from '../enums/equiepment';
import { FilterCategory } from '../enums/filterCategory';
import { Muscles } from '../enums/muscles';

// Tempporary testing api endpoints:
const fetchExercises = async () => {
  try {
    const exercises = await getExercises({
      bodypart: BodyParts.Back,
      muscles: Muscles.Lats,
      equipment: Equipment.Cable,
      keyword: 'pull',
      page: 1,
      limit: 10,
    });

    console.log('Отримані вправи:', exercises.results);
  } catch (error) {
    console.error('Помилка при отриманні вправ:', error);
  }
};
const fetchFilters = async () => {
  try {
    const filters = await getFilters(FilterCategory.Equipment);
    console.log('Отримані фільтри:', filters.results);
  } catch (error) {
    console.error('Помилка при отриманні фільтрів:', error);
  }
};

const fetchQuote = async () => {
  try {
    const quote = await getQuoteOfTheDay();
    console.log('Цитата дня:', `"${quote.quote}" - ${quote.author}`);
  } catch (error) {
    console.error('Помилка при отриманні цитати дня:', error);
  }
};

fetchExercises();
fetchFilters();
fetchQuote();
