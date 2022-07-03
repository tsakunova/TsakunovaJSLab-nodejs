const AWS = require('aws-sdk');
const v4 = require('uuid').v4;

const docClient = new AWS.DynamoDB.DocumentClient();
const headers = {
  "content-type": "application/json",
};

class IngredientServices {
  tableName;
  constructor(tn) {
    this.tableName = tn;
  }
  async getIngredients() {
    const output = await docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();
    return output;
  }

  async fetchIngredientById(id) {
    const output = await docClient
      .get({
        TableName: this.tableName,
        Key: {
          ingredientID: id,
        },
      })
      .promise();
    if (!output) {
      throw new HttpError(404, {
        error: "Not found",
      });
    }
    return output.Item;
  };

  async getIngredient(id) {
    const ingredient = await this.fetchIngredientById(id);
    return ingredient;
  };

  async createIngredient(ingredient) {
    await docClient.put({
      TableName: this.tableName,
      Item: ingredient
    }).promise();
    return ingredient;
  };

  async updateIngredient(ingredient) {
    const {
      ingredientID
    } = ingredient;
    await this.fetchIngredientById(ingredientID);
    await docClient
      .put({
        TableName: this.tableName,
        Item: ingredient,
      })
      .promise();
    return ingredient;
  }

  async deleteIngredient(id) {
    await this.fetchIngredientById(id);
    await docClient
      .delete({
        TableName: this.tableName,
        Key: {
          ingredientID: id,
        },
      })
      .promise();
    return null;
  }
}

module.exports = {
  IngredientServices
};