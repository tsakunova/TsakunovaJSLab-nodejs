const {
  IngredientServices
} = require('./services');
const v4 = require('uuid').v4;
const yup = require('yup');

const tableName = "BarTable";

const schema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  unit: yup.string().required(),
});

class IngredientController {
  services;
  constructor() {
    this.services = new IngredientServices(tableName)
  }

  listIngredient = async (req, res) => {
    try {
      const output = await this.services.getIngredients();
      res.status(200).json(output)
    } catch (e) {
      res.status(500).send({
        error: 'Something failed!'
      });
    }
  };

  getIngredient = async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const ingredient = await this.services.getIngredient(id);
      res.status(200).json(ingredient)
    } catch (error) {
      res.status(404).send({
        error: "Ingredient not found"
      });
    }
  };

  createIngredient = async (req, res) => {
    try {
      const {
        body
      } = req;
      await schema.validate(body, {
        abortEarly: false
      });
      const ingredient = {
        ...body,
        ingredientID: v4(),
      }
      const newIngredient = await this.services.createIngredient(ingredient)
      res.status(201).send(newIngredient);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  updateIngredient = async (req, res) => {
    try {
      const {
        id
      } = req.params;
      const reqBody = req.body;
      await schema.validate(reqBody, {
        abortEarly: false
      });
      const ingredient = {
        ...reqBody,
        ingredientID: id,
      };
      const updatedIngredient = await this.services.updateIngredient(ingredient)
      res.status(201).send(updatedIngredient);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  deleteIngredient = async (req, res) => {
    try {
      const {
        id
      } = req.params;
      await this.services.deleteIngredient(id)
      res.status(200).json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = {
  IngredientController
};