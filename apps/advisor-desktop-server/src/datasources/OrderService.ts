import { DataSource } from 'apollo-datasource';
import { OrderInput, OrderStatus } from 'advisor-models';
import { v4 as uuidv4 } from 'uuid';
import orders from './data/orders.json';

export class OrderService extends DataSource {
  constructor() {
    super();
  }

  initialize() {}

  getAccountOrders(accountId: string) {
    return orders.filter((order) => order.accountId === accountId);
  }

  placeOrder(orderInput: OrderInput) {
    const { accountId, side, symbol, quantity, type, limitPrice } = orderInput;
    const order = {
      id: uuidv4(),
      side,
      symbol,
      quantity,
      type,
      limitPrice,
      status: OrderStatus.Placed,
      accountId,
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    return order;
  }

  executeOrder(orderId: string) {
    const order = orders.find((order) => order.id === orderId);
    if (order) {
      order.status = OrderStatus.Executed;
    }
  }
}
