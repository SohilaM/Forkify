import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // Polyfilling everthing else
import 'regenerator-runtime/runtime'; // Polyfilling async/await

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
