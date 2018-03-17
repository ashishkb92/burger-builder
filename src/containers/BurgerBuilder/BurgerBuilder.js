import React, { Component } from 'react';

import Aux from '../../hoc/AuxF/AuxF';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuidControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount
    };
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState(
      { ingredients: updatedIngredients, totalPrice: newPrice },
      () => this.updatePurchaseState()
    );
  };

  updatePurchaseState = () => {
    const ingredients = { ...this.state.ingredients };
    const sum = Object.values(ingredients).reduce((total, a) => total + a);
    this.setState({ purchasable: sum > 0 });
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] > 0) {
      this.setState(
        prevState => ({
          ingredients: {
            ...prevState.ingredients,
            [type]: prevState.ingredients[type] - 1
          },
          totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
        }),
        () => this.updatePurchaseState()
      );
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    console.log('purchase');
  };

  render() {
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          totalPrice={this.state.totalPrice}
          ingredients={this.state.ingredients}
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
