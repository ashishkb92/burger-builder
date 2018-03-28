import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';

const INITIAL_STATE = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  return updateObject(state, {
    loading: false,
    orders: [...state.orders, ...newOrder],
    purchased: true,
  });
}

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
  });
}

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)  

    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action) 

    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)    

    case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, { loading: false });

    case actionTypes.FETCH_ORDERS_START: return updateObject(state, { loading: true });

    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
    
    case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, { loading: false });

    default: return state;
  }
};
