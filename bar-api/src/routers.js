const express = require('express');
const {
  IngredientController
} = require('./controller');
const router = express.Router();

const controller = new IngredientController();

router.route('/all').get(controller.listIngredient);

router.route('/new')
  .post(controller.createIngredient)

router.route('/:id')
  .get(controller.getIngredient)
  .put(controller.updateIngredient)
  .delete(controller.deleteIngredient);

module.exports = router;