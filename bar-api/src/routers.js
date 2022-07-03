const express = require('express');
const {
  IngredientController
} = require('./controller');
const router = express.Router();

const controller = new IngredientController();

router.route('/ingredients').get(controller.listIngredient);

router.route('/ingredient/new')
  .post(controller.createIngredient);

router.route('/ingredient/:id')
  .get(controller.getIngredient)
  .put(controller.updateIngredient)
  .delete(controller.deleteIngredient);

router.get('/', (req, res) => {
  res.status(200).send('IngredientsApi works');
});

router.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

module.exports = router;