import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class Orders extends Component {
  componentDidMount() {
    this.props.onInitFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    const order = this.props.loading ? (
      <Spinner />
    ) : (
      this.props.orders.map(order => <Order {...order} />)
    );
    return <div>{order}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios),
);
