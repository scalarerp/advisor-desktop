import { OrderType, Side } from 'advisor-models';

export const resolvers = {
  Query: {
    clients(parent, { query }, { dataSources }) {
      return dataSources.clientService.getClients();
    },

    client(parent, { clientId }, { dataSources }) {
      return dataSources.clientService.getClient(clientId);
    },

    securities(parent, { query }, { dataSources }) {
      return dataSources.securityService.getSecurities(query);
    },

    accounts(parent, { clientId }, { dataSources }) {
      return dataSources.accountService.getAccounts(clientId);
    },

    account(parent, { accountId }, { dataSources }) {
      return dataSources.accountService.getAccount(accountId);
    },

    holdings(parent, { accountId }, { dataSources }) {
      return dataSources.accountService.getAccountHoldings(accountId);
    },

    orders(parent, { accountId }, { dataSources }) {
      return dataSources.orderService.getAccountOrders(accountId);
    },
  },

  Mutation: {
    placeOrder(parent, { orderInput }, { dataSources }) {
      const { accountId, side, symbol, quantity, type, limitPrice } =
        orderInput;
      const { accountService, orderService, securityService } = dataSources;

      // get cash balance in the account
      const cashBalance = accountService.getAccountCashBalance(accountId);
      if (cashBalance === undefined) {
        throw new Error('Account not found');
      }

      // get existing holdings in the account (if any)
      let holding = accountService.getAccountHolding(accountId, symbol);

      // get the data for the security that needs to be traded
      const security = securityService.getSecurity(symbol);
      if (security === undefined) {
        throw new Error('Security not found');
      }

      // compute total market price for the order based on the current security price
      const totalMarketPrice = quantity * security.price;

      // assume that the order is executable
      let executable = true;

      // if limit price is not met, then mark executable = false
      if (type === OrderType.Limit) {
        if (limitPrice === undefined || limitPrice === null) {
          throw new Error('Limit price not specified');
        }

        switch (side) {
          case Side.Buy:
            if (security.price > limitPrice) {
              executable = false;
            }
            break;
          case Side.Sell:
            if (security.price < limitPrice) {
              executable = false;
            }
            break;
        }
      }

      // validate for cash or holdings availability
      if (executable) {
        switch (side) {
          case Side.Buy:
            if (cashBalance.balance < totalMarketPrice) {
              throw new Error('Insufficient funds');
            }
            break;
          case Side.Sell:
            if (holding === undefined || holding.quantity < quantity) {
              throw new Error(
                `Insufficient shares of ${symbol} in your account`
              );
            }
            break;
        }
      }

      // at this point the order is valid, place it
      const order = orderService.placeOrder(orderInput);

      // now execute the order if it is executable (otherwise it just sits as PLACED)
      if (executable) {
        switch (side) {
          case Side.Buy:
            accountService.withdrawCash(accountId, totalMarketPrice);
            accountService.depositShares(accountId, symbol, quantity);
            break;
          case Side.Sell:
            accountService.depositCash(accountId, totalMarketPrice);
            accountService.withdrawShares(accountId, symbol, quantity);
            break;
        }

        // mark the order as executed
        orderService.executeOrder(order.id);
      }

      return order;
    },
  },

  Client: {
    cashBalance({ id }, args, { dataSources }) {
      const balance = dataSources.accountService.getClientCashBalance(id);
      return balance ? balance : 0;
    },

    investmentTotal({ id }, args, { dataSources }) {
      const { accountService, securityService } = dataSources;

      const holdings = accountService.getClientHoldings(id);
      return securityService.getInvestmentTotal(holdings);
    },
  },

  Account: {
    cashBalance({ id }, args, { dataSources }) {
      const balance = dataSources.accountService.getAccountCashBalance(id);
      return balance ? balance : 0;
    },

    holdings({ id }, args, { dataSources }) {
      return dataSources.accountService.getAccountHoldings(id);
    },
  },

  Holding: {
    security({ symbol }, args, { dataSources }) {
      return dataSources.securityService.getSecurity(symbol);
    },
    account({ accountId }, args, { dataSources }) {
      return dataSources.accountService.getAccount(accountId);
    },
    value({ symbol, quantity }, args, { dataSources }) {
      const security = dataSources.securityService.getSecurity(symbol);
      return security.price * quantity;
    },
  },

  Order: {
    security({ symbol }, args, { dataSources }) {
      return dataSources.securityService.getSecurity(symbol);
    },
    account({ accountId }, args, { dataSources }) {
      return dataSources.accountService.getAccount(accountId);
    },
  },
};
